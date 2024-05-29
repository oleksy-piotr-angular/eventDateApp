import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetails } from '../../../models/event-details';

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css',
})
export class DetailsModalComponent {
  @Input() eventDetails!: EventDetails;
  onClose = new EventEmitter<void>();
  onCloseModal() {
    this.onClose.emit();
  }
}
