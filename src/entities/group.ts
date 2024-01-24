import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Account} from './account';

export type GroupInput = {
  id?: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  accounts?: Account[];
};

@Entity()
export class Group {
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

  @ManyToMany(() => Account, account => account.groups, {cascade: true})
  @JoinTable()
  accounts?: Account[];

  constructor();
  constructor(obj: GroupInput);
  constructor(obj?: GroupInput) {
    this.id = obj?.id;
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    this.createdAt = obj?.createdAt ?? new Date();
    this.updatedAt = obj?.updatedAt ?? new Date();
  }
}
