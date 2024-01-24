import {AccountDto} from './account.dto';

export type GroupDtoInput = {
  id?: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  accountDtos?: AccountDto[];
  balance?: number;
};
export class GroupDto {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  accountDtos?: AccountDto[];
  balance?: number;

  constructor();
  constructor(obj: GroupDtoInput);
  constructor(obj?: GroupDtoInput) {
    this.id = obj?.id;
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    this.createdAt = obj?.createdAt ?? new Date();
    this.updatedAt = obj?.updatedAt ?? new Date();
    this.accountDtos = obj?.accountDtos;
    this.balance =
      obj?.balance ??
      obj?.accountDtos?.reduce(
        (accumulator, accountDto) => accumulator + (accountDto.balance ?? 0),
        0,
      );
  }
}
