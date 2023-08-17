import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Message} from './message';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({type: 'datetime'})
  createdAt: Date;

  @Column({type: 'datetime'})
  updatedAt: Date;

  @OneToMany(() => Message, message => message.tracker)
  messages?: Message[];

  balance?: number;

  constructor(
    name: Tracker['name'],
    description: Tracker['description'],
    createdAt?: Tracker['createdAt'],
    updatedAt?: Tracker['updatedAt'],
    messages?: Tracker['messages'],
    id?: Tracker['id'],
  ) {
    this.name = name;
    this.description = description;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.messages = messages;
    this.id = id;
  }
}
