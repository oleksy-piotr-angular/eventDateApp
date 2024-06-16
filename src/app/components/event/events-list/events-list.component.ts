import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../../../models/event';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { DeviceMalfunction } from '../../../models/event-details/device-malfunction';
import { TemperatureExceeded } from '../../../models/event-details/temp-exceed';
import { DoorUnlocked } from '../../../models/event-details/door-unlocked';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
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
  showDetails(_event: Event) {
    this.componentHost.clear();
    const detailsRef = this.componentHost.createComponent(
      DetailsModalComponent
    );
    let eventDetails:
      | DoorUnlocked
      | DeviceMalfunction
      | TemperatureExceeded
      | undefined = this.setEventDetailsData(_event);

    detailsRef.setInput('eventDetails', eventDetails);
    this.closeDetailSub = detailsRef.instance.onClose.subscribe(() => {
      this.closeDetailSub.unsubscribe();
      this.componentHost.clear();
    });
  }

  timestampConverter(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  private setEventDetailsData(
    _event: Event
  ): DeviceMalfunction | TemperatureExceeded | DoorUnlocked | undefined {
    let eventDetails = undefined;
    if (_event.type === 'deviceMalfunction') {
      eventDetails = {
        reasonCode: (<DeviceMalfunction>_event.evtData).reasonCode,
        reasonText: (<DeviceMalfunction>_event.evtData).reasonText,
      };
    } else if (_event.type === 'temperatureExceeded') {
      eventDetails = {
        temp: (<TemperatureExceeded>_event.evtData).temp,
        treshold: (<TemperatureExceeded>_event.evtData).treshold,
      };
    } else if (_event.type === 'doorUnlocked') {
      eventDetails = {
        unlockDate: (<DoorUnlocked>_event.evtData).unlockDate,
      };
    }
    return eventDetails;
  }
}
