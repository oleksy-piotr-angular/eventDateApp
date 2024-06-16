import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceMalfunction } from '../../../models/event-details/device-malfunction';
import { TemperatureExceeded } from '../../../models/event-details/temp-exceed';
import { DoorUnlocked } from '../../../models/event-details/door-unlocked';
interface EventDetailsOutput {
  key: string;
  value: string | number;
}
@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css',
})
export class DetailsModalComponent implements OnInit {
  @Input() eventDetails!:
    | DeviceMalfunction
    | TemperatureExceeded
    | DoorUnlocked
    | undefined;
  eventDetailsOutput: EventDetailsOutput[] | undefined = [];

  ngOnInit(): void {
    this.eventDetailsOutput = this.detailsObjToArrayConverter(
      this.eventDetails
    );
  }

  onClose = new EventEmitter<void>();

  onCloseModal() {
    this.onClose.emit();
  }

  timestampConverter(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  detailsObjToArrayConverter(
    _details: DeviceMalfunction | TemperatureExceeded | DoorUnlocked | undefined
  ): EventDetailsOutput[] | undefined {
    let output: EventDetailsOutput[] = [];
    if (_details) {
      const detailKeys = Object.keys(_details);
      const detailValues = Object.values(_details);
      const length = detailKeys.length;

      if (detailKeys[0] === 'unlockDate') {
        output.push({
          key: detailKeys[0],
          value: this.timestampConverter(detailValues[0]),
        });
      } else {
        for (let i = 0; i < length; i++) {
          output.push({
            key: detailKeys[i],
            value: detailValues[i],
          });
        }
      }
      return output;
    } else {
      return undefined;
    }
  }
}
