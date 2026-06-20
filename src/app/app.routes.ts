import { Routes } from '@angular/router';
import { TicketDetails } from './ticket-details/ticket-details';

export const routes: Routes = [
  { path: '', redirectTo: 'ticket', pathMatch: 'full' },
  { path: 'ticket', component: TicketDetails },
];
