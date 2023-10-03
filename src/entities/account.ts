import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Transaction} from './transaction';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({type: 'datetime'})
  createdAt: Date;

  @Column({type: 'datetime'})
  updatedAt: Date;

  @OneToMany(() => Transaction, message => message.account)
  transactions: Transaction[] | undefined;

  constructor(
    name: Account['name'],
    description: Account['description'],
    createdAt?: Account['createdAt'],
    updatedAt?: Account['updatedAt'],
    transactions?: Account['transactions'],
    id?: Account['id'],
  ) {
    this.name = name;
    this.description = description;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.transactions = transactions;
    this.id = id;
  }
}
