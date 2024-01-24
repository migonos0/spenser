import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Transaction} from './transaction';
import {Group} from './group';

export type AccountInput = {
  id?: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  transactions?: Transaction[];
  groups?: Group[];
};

@Entity()
export class Account {
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

  @OneToMany(() => Transaction, message => message.account)
  transactions?: Transaction[];

  @ManyToMany(() => Group, group => group.accounts)
  groups?: Group[];

  constructor();
  constructor(obj: AccountInput);
  constructor(obj?: AccountInput) {
    this.id = obj?.id;
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    this.createdAt = obj?.createdAt ?? new Date();
    this.updatedAt = obj?.updatedAt ?? new Date();
    this.groups = obj?.groups;
  }
}
