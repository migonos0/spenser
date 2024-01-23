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
  id?: number;

  @Column({nullable: false})
  isExpense: boolean;

  @Column({type: 'numeric', precision: 2, nullable: false})
  amount: number;

  @Column({nullable: false})
  description: string;

  @ManyToMany(() => Tag, tag => tag.messages, {cascade: true})
  @JoinTable()
  tags?: Tag[];

  @ManyToOne(() => Account, tracker => tracker.transactions)
  account?: Account;

  constructor();
  constructor(obj: Transaction);
  constructor(obj?: Transaction) {
    this.id = obj?.id;
    this.isExpense = obj?.isExpense ?? false;
    this.amount = obj?.amount ?? 0;
    this.description = obj?.description ?? '';
    this.tags = obj?.tags;
    this.account = obj?.account;
  }
}
