import {Group} from '../entities/group';
import {findBalanceByGroupId} from '../services/group.service';

export class GroupDto {
  id: Group['id'];
  name: Group['name'];
  description: Group['description'];
  createdAt: Group['createdAt'];
  updatedAt: Group['updatedAt'];
  accounts: Group['accounts'];
  balance: number | undefined;

  constructor(groupDto: GroupDto) {
    this.id = groupDto.id;
    this.name = groupDto.name;
    this.description = groupDto.description;
    this.createdAt = groupDto.createdAt;
    this.updatedAt = groupDto.updatedAt;
    this.accounts = groupDto.accounts;
    this.balance = groupDto.balance;
  }

  static async build(group: Group) {
    return new GroupDto({
      ...group,
      balance: await findBalanceByGroupId(group.id),
    });
  }
}
