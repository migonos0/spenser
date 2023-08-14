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

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToMany(() => Tag, tag => tag.messages, {cascade: true})
  @JoinTable()
  tags?: Tag[];

  constructor(isExpense: boolean, amount: number, description: string) {
    this.isExpense = isExpense;
    this.amount = amount;
    this.description = description;
  }
}
