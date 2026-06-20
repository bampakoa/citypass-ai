import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TicketService } from '../ticket.service';

@Component({
  standalone: true,
  selector: 'app-ai-editor-dialog',
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>AI Editor</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="full">
        <textarea #prompt matInput rows="8" placeholder="Enter prompt or notes"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close(prompt.value)">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`.full { width: 100%; }`],
})
export class AiEditorDialog {
    private readonly tickets = inject(TicketService);
    
  constructor(private readonly dialogRef: MatDialogRef<AiEditorDialog>) {}
  close(prompt: string) {
    this.tickets.ask(prompt);
    this.dialogRef.close();
  }
}
