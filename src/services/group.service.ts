import {AccountDto} from '../dtos/account.dto';
import {GroupDto, GroupDtoInput} from '../dtos/group.dto';
import {Group, GroupInput} from '../entities/group';
import {dataSource} from '../utilities/data-source';

export const findAllGroups = async () => {
  return await dataSource.manager.find(Group, {
    order: {updatedAt: 'desc'},
    relations: {accounts: true},
  });
};

export const createGroup = async (input: GroupDtoInput) =>
  new GroupDto({
    ...(await dataSource.manager.save(
      new Group({...input, accounts: input.accountDtos}),
    )),
    accountDtos: input.accountDtos,
  });

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
  Promise.all(
    (await findAllGroups()).map(
      async group =>
        new GroupDto({
          ...group,
          accountDtos: await Promise.all(
            (group.accounts ?? []).map(account => AccountDto.build(account)),
          ),
        }),
    ),
  );

export const deleteGroup = async (group: GroupInput) => {
  const deletableGroup = new Group({
    ...group,
    accounts: [],
  });
  await dataSource.manager.save(deletableGroup);
  const result = await dataSource.manager.delete(Group, group.id);
  if (result.affected && !(result.affected > 0)) {
    throw new Error('An error occured while deleting the group.');
  }
  return group;
};
