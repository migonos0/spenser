import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import {Message} from './message';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToMany(() => Message, message => message.tags)
  messages?: Message[];

  constructor(name: string) {
    this.name = name;
  }
}
