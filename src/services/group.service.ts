import {AccountDto} from '../dtos/account.dto';
import {GroupDto} from '../dtos/group.dto';
import {Group} from '../entities/group';
import {dataSource} from '../utilities/data-source';

export const findAllGroups = async () => {
  return await dataSource.manager.find(Group, {order: {updatedAt: 'desc'}});
};

export const createGroup = async (group: Group) =>
  await GroupDto.build(await dataSource.manager.save(group));

export const findBalanceByGroupId = async (groupId: Group['id']) => {
  const foundGroup = await dataSource.manager.findOne(Group, {
    relations: {accounts: true},
    where: {id: groupId},
  });
  if (!foundGroup) {
    return;
  }
  return (
    await Promise.all(
      (foundGroup.accounts ?? []).map(account => AccountDto.build(account)),
    )
  ).reduce(
    (accumulator, currentAccountDto) =>
      accumulator + (currentAccountDto.balance ?? 0),
    0,
  );
};

export const findAllGroupDtos = async () =>
  Promise.all((await findAllGroups()).map(group => GroupDto.build(group)));
