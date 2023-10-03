import {DataSource} from 'typeorm';
import {Account} from '../entities/account';
import {findBalanceByAccountId} from '../services/account.service';

export class AccountDto {
  id: Account['id'];
  name: Account['name'];
  description: Account['description'];
  balance: number | undefined;
  createdAt: Account['createdAt'];
  updatedAt: Account['updatedAt'];
  transactions: Account['transactions'];

  constructor(trackerDto: AccountDto) {
    this.id = trackerDto.id;
    this.name = trackerDto.name;
    this.description = trackerDto.description;
    this.balance = trackerDto.balance;
    this.createdAt = trackerDto.createdAt;
    this.updatedAt = trackerDto.updatedAt;
    this.transactions = trackerDto.transactions;
  }

  static build(account: Account) {
    return async (ds: DataSource) =>
      new AccountDto({
        ...account,
        balance: await findBalanceByAccountId(account.id)(ds),
      });
  }
}
