import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Message} from './message';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToMany(() => Message, message => message.tracker)
  messages?: Message[];

  constructor(
    name: Tracker['name'],
    messages: Tracker['messages'],
    id: Tracker['id'],
  ) {
    this.name = name;
    this.messages = messages;
    this.id = id;
  }
}
