export class Timelog {
  data: {
    startTime: Date;
    startTimestamp: number;
    endTime?: Date;
    endTimestamp: number;
    diff?: number;
    user: string;
    message: string;
  };
  ref: {
    id: string;
    path: string;
  };
}
