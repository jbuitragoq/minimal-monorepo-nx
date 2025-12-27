import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { UiShared } from '@minimal-monorepo/ui-shared'

@Component({
  imports: [NxWelcome, RouterModule, UiShared],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'app1';
}
