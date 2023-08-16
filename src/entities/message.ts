import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import {Tag} from './tag';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  isExpense: boolean;

  @Column({type: 'numeric', precision: 2})
  amount: number;

  @Column()
  description: string;

  @ManyToMany(() => Tag, tag => tag.messages, {cascade: true})
  @JoinTable()
  tags?: Tag[];

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
