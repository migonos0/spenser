import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Message} from './message';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({type: 'date'})
  createdAt: Date;

  @Column({type: 'date'})
  updatedAt: Date;

  @OneToMany(() => Message, message => message.tracker)
  messages?: Message[];

  constructor(
    name: Tracker['name'],
    createdAt: Tracker['createdAt'] = new Date(),
    updatedAt: Tracker['updatedAt'] = new Date(),
    messages: Tracker['messages'],
    id: Tracker['id'],
  ) {
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.messages = messages;
    this.id = id;
  }
}
