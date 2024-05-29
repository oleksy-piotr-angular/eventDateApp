import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Observable } from 'rxjs';
import { Event } from '../../../models/event';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, DatePipe],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent {
  events$?: Observable<Event[]>;
  private http = inject(HttpService);
  ngOnInit(): void {
    this.events$ = this.http.getEvents();
    this.http.getEvents().subscribe((events) => {
      console.log(events);
    });
  }
  checkDate(date: number) {
    return new Date(date).toLocaleString();
  }
}
