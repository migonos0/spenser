import {Account} from '../entities/account';
import {Transaction} from '../entities/transaction';
import {findBalanceByAccountId} from '../services/account.service';

export class AccountDto {
  id?: number;
  name: string;
  description: string;
  balance?: number;
  createdAt: Date;
  updatedAt: Date;
  transactions?: Transaction[];

  constructor();
  constructor(accountDto: AccountDto);
  constructor(accountDto?: AccountDto) {
    this.id = accountDto?.id;
    this.name = accountDto?.name ?? '';
    this.description = accountDto?.description ?? '';
    this.balance = accountDto?.balance;
    this.createdAt = accountDto?.createdAt ?? new Date();
    this.updatedAt = accountDto?.updatedAt ?? new Date();
    this.transactions = accountDto?.transactions;
  }

  static async build(account: Account) {
    return new AccountDto({
      ...account,
      balance: await findBalanceByAccountId(account.id),
    });
  }
}
