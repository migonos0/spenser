import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';

import {Transaction} from './transaction';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToMany(() => Transaction, message => message.tags, {cascade: true})
  transactions?: Transaction[];

  constructor();
  constructor(obj: Tag);
  constructor(obj?: Tag) {
    this.id = obj?.id;
    this.name = obj?.name ?? '';
    this.transactions = obj?.transactions;
  }
}
