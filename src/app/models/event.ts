import { DeviceMalfunction } from './event-details/device-malfunction';
import { DoorUnlocked } from './event-details/door-unlocked';
import { TemperatureExceeded } from './event-details/temp-exceed';

export interface Event {
  deviceId: string;
  eventDate: number;
  type: string;
  evtData: DoorUnlocked | TemperatureExceeded | DeviceMalfunction | undefined;
}
