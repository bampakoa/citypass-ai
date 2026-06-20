import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AiEditorDialog } from './ai-editor/ai-editor-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatDialogModule],
  template: `
    <mat-toolbar color="primary" class="app-toolbar">
      <span class="app-title">CityPass</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/ticket">Ticket Details</a>
      <a mat-button (click)="openAiEditor()">AI editor</a>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {
  private readonly dialog = inject(MatDialog);

  openAiEditor() {
    this.dialog.open(AiEditorDialog);
  }
}
