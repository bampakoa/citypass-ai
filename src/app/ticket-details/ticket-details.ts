import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-details',
  imports: [
    CommonModule,
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.scss',
})
export class TicketDetails {
  private readonly ticketService = inject(TicketService);
  private readonly snackBar = inject(MatSnackBar);
  locations = ['Lot A', 'Lot B', 'Street 12', 'Garage 3'];

  private readonly ticketModel = signal({
    carNumber: '',
    arrivalDate: '',
    location: '',
  });

  ticketForm = form(this.ticketModel, (schema) => {
    required(schema.carNumber, { message: 'Car number is required.' });
    required(schema.arrivalDate, { message: 'Arrival date is required.' });
    required(schema.location, { message: 'Parking location is required.' });
  });

  readonly tickets = this.ticketService.tickets$;

  async onSubmit() {
    await submit(this.ticketForm, async () => {
      const payload = this.ticketForm().value();
      const saved = this.ticketService.save(payload);
      console.log('Parking ticket created', saved);
      this.snackBar.open(`Parking ticket created for ${saved.carNumber}`, 'Dismiss', { duration: 3000 });
      this.ticketModel.set({ carNumber: '', arrivalDate: '', location: '' });
    });
  }
}
