import { Inject, Injectable, signal, Signal } from '@angular/core';
import { ChatSession, Schema, getAI, getGenerativeModel } from 'firebase/ai';
import { FirebaseApp } from 'firebase/app';

export interface Ticket {
  carNumber: string;
  arrivalDate: string;
  location: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly tickets = signal<Ticket[]>([]);
  private readonly chatSession: ChatSession;

  readonly tickets$: Signal<Ticket[]> = this.tickets;

  constructor(@Inject('FIREBASE_APP') firebaseApp: FirebaseApp) {
    const toolSet = {
        functionDeclarations: [
            {
                name: 'createTicket',
                description: 'Creates a parking ticket with the given details.',
                parameters: Schema.object({
                    properties: {
                        carNumber: Schema.string(),
                        arrivalDate: Schema.string(),
                        location: Schema.string()
                    }
                })
            }
        ]
    }

    const instructions = `
        Welcome to citypass.
        You are a superstar agent for this car parking validator.
        You will assist users by submitting parking tickets.
        You can convert dates in whatever format to ISO date string and
        geocode a location or address to coordinates long/lat using Google Maps.
        `;
    
    const ai = getAI(firebaseApp);
    const genModel = getGenerativeModel(ai, {
        systemInstruction: instructions,
        tools: [toolSet],
        model: 'gemini-2.5-flash'
    });

    this.chatSession = genModel.startChat();
  }

  async ask(prompt: string) {
    const result = await this.chatSession.sendMessage(prompt);
    const calls = result.response.functionCalls();

    if (calls && calls[0].name === 'createTicket') {
        const args = calls[0].args as Record<string, string>;
        this.save({
            carNumber: args['carNumber'],
            arrivalDate: args['arrivalDate'],
            location: args['location']
        });
    }
  }

  save(ticket: Omit<Ticket, 'createdAt'>) {
    const newTicket: Ticket = {
      ...ticket,
      createdAt: new Date().toISOString(),
    };
    this.tickets.update((current) => [...current, newTicket]);
    return newTicket;
  }
}
