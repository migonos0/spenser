import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import {Tag} from './tag';
import {Account} from './account';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  isExpense: boolean;

  @Column({type: 'numeric', precision: 2})
  amount: number;

  @Column()
  description: string;

  @ManyToMany(() => Tag, tag => tag.messages, {cascade: true})
  @JoinTable()
  tags: Tag[] | undefined;

  @ManyToOne(() => Account, tracker => tracker.transactions)
  account: Account | undefined;

  constructor(
    isExpense: Transaction['isExpense'],
    amount: Transaction['amount'],
    description: Transaction['description'],
    account: Transaction['account'],
    tags: Transaction['tags'],
  ) {
    this.isExpense = isExpense;
    this.amount = amount;
    this.description = description;
    this.account = account;
    this.tags = tags;
  }
}
