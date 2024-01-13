import {Group} from '../entities/group';
import {AccountDto} from './account.dto';

export class GroupDto {
  id: Group['id'];
  name: Group['name'];
  description: Group['description'];
  createdAt: Group['createdAt'];
  updatedAt: Group['updatedAt'];
  accountDtos: AccountDto[] | undefined;
  balance?: number;

  constructor(groupDto: GroupDto) {
    this.id = groupDto.id;
    this.name = groupDto.name;
    this.description = groupDto.description;
    this.createdAt = groupDto.createdAt;
    this.updatedAt = groupDto.updatedAt;
    this.accountDtos = groupDto.accountDtos;
    this.balance =
      groupDto.balance ??
      groupDto.accountDtos?.reduce(
        (accumulator, accountDto) => accumulator + (accountDto.balance ?? 0),
        0,
      );
  }
}
