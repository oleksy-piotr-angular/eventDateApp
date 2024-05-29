export interface Event {
  deviceId: string;
  eventDate: number;
  type: string;
  evtData: {
    reasonCode?: number;
    reasonText?: string;
    temp?: number;
    treshold?: number;
    unlockDate?: number;
  };
}
