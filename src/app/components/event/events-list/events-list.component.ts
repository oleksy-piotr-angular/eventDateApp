import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent {
  private http = inject(HttpService);
  ngOnInit(): void {
    this.http.getEvents().subscribe((events) => console.log(events));
  }
}
