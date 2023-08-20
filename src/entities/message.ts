import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import {Tag} from './tag';
import {Tracker} from './tracker';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  isExpense: boolean;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToMany(() => Tag, tag => tag.messages, {cascade: true})
  @JoinTable()
  tags: Tag[] | undefined;

  @ManyToOne(() => Tracker, tracker => tracker.messages)
  tracker: Tracker | undefined;

  constructor(
    isExpense: Message['isExpense'],
    amount: Message['amount'],
    description: Message['description'],
    tracker: Message['tracker'],
    tags: Message['tags'],
  ) {
    this.isExpense = isExpense;
    this.amount = amount;
    this.description = description;
    this.tracker = tracker;
    this.tags = tags;
  }
}
