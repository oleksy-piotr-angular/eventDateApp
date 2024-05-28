import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventsListComponent } from './components/event/events-list/events-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'eventDateApp';
}
