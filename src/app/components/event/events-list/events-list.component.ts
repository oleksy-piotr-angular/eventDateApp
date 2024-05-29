import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../../../models/event';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { EventDetails } from '../../../models/event-details';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, DatePipe],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent {
  events$?: Observable<Event[]>;
  private http = inject(HttpService);
  closeDetailSub!: Subscription;
  @ViewChild('appPlaceHolder', { read: ViewContainerRef })
  componentHost!: ViewContainerRef;
  ngOnInit(): void {
    this.events$ = this.http.getEvents();
  }
  checkDate(date: number) {
    return new Date(date).toLocaleString();
  }
  showDetails(_event: Event) {
    this.componentHost.clear();
    const detailsRef = this.componentHost.createComponent(
      DetailsModalComponent
    );
    const eventDetails: EventDetails = {
      reasonCode: _event.evtData.reasonCode,
      reasonText: _event.evtData.reasonText,
      temp: _event.evtData.temp,
      treshold: _event.evtData.treshold,
      unlockDate: _event.evtData.unlockDate
        ? this.checkDate(_event.evtData.unlockDate)
        : undefined,
    };
    detailsRef.setInput('eventDetails', eventDetails);
    this.closeDetailSub = detailsRef.instance.onClose.subscribe(() => {
      this.closeDetailSub.unsubscribe();
      this.componentHost.clear();
    });
  }
}
