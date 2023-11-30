import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Account} from './account';

@Entity()
export class Group {
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

  @ManyToMany(() => Account, account => account.groups)
  accounts: Account[] | undefined;

  constructor(
    name: Group['name'],
    description: Group['description'],
    accounts?: Group['accounts'],
  ) {
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.accounts = accounts;
  }
}
