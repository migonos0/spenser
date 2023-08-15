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
  id?: number;

  @Column()
  isExpense: boolean;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToMany(() => Tag, tag => tag.messages, {cascade: true})
  @JoinTable()
  tags?: Tag[];

  @ManyToOne(() => Tracker, tracker => tracker.messages)
  tracker?: Tracker;

  constructor(
    isExpense: boolean,
    amount: number,
    description: string,
    tags?: Tag[],
  ) {
    this.isExpense = isExpense;
    this.amount = amount;
    this.description = description;
    this.tags = tags;
  }

  // constructor(args: {
  //   isExpense: boolean;
  //   amount: number;
  //   description: string;
  //   tags?: Tag[];
  // }) {
  //   this.isExpense = args.isExpense;
  //   this.amount = args.amount;
  //   this.description = args.description;
  //   this.tags = args.tags;
  // }
}
