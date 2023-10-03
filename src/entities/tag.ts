import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';

import {Transaction} from './transaction';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToMany(() => Transaction, message => message.tags)
  messages?: Transaction[];

  constructor(name: string) {
    this.name = name;
  }
}
