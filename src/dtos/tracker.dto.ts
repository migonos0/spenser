import {DataSource} from 'typeorm';
import {Tracker} from '../entities/tracker';
import {findBalanceByTrackerId} from '../services/tracker.service';

export class TrackerDto {
  id: Tracker['id'];
  name: Tracker['name'];
  description: Tracker['description'];
  balance: number | undefined;
  createdAt: Tracker['createdAt'];
  updatedAt: Tracker['updatedAt'];
  messages: Tracker['messages'];

  constructor(trackerDto: TrackerDto) {
    this.id = trackerDto.id;
    this.name = trackerDto.name;
    this.description = trackerDto.description;
    this.balance = trackerDto.balance;
    this.createdAt = trackerDto.createdAt;
    this.updatedAt = trackerDto.updatedAt;
    this.messages = trackerDto.messages;
  }

  static build(tracker: Tracker) {
    return async (ds: DataSource) =>
      new TrackerDto({
        ...tracker,
        balance: await findBalanceByTrackerId(tracker.id)(ds),
      });
  }
}
