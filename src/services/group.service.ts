import {number, safeParse} from 'valibot';
import {GroupDto, GroupDtoInput} from '../dtos/group.dto';
import {Group, GroupInput} from '../entities/group';
import {dataSource} from '../utilities/data-source';
import {Account} from '../entities/account';

export const createGroup = async (input: GroupInput) =>
  await dataSource.manager.save(new Group({...input}));

export const createGroupDto = async (input: GroupDtoInput) =>
  new GroupDto({
    ...(await createGroup({...input, accounts: input.accountDtos})),
    accountDtos: input.accountDtos,
  });

export const findBalanceByGroupId = async (groupId: Group['id']) => {
  const {balance} = await dataSource
    .createQueryBuilder()
    .from(Group, 'group')
    .innerJoin('group.accounts', 'account')
    .innerJoin('account.transactions', 'transaction')
    .where('group.id = :groupId', {groupId})
    .select('SUM(transaction.amount)', 'balance')
    .getRawOne();

  const parsedBalance = safeParse(number(), balance);

  if (!parsedBalance.success) {
    return;
  }

  return parsedBalance.output;
};

export const findAllGroups = async () =>
  await dataSource.manager.find(Group, {
    order: {updatedAt: 'desc'},
    relations: {accounts: true},
  });

export const findAllGroupDtos = async () =>
  Promise.all((await findAllGroups()).map(group => GroupDto.build(group)));

export const deleteGroup = async (group: Group) => {
  const modifiedGroup = await dataSource.manager.save(
    new Group({
      ...group,
      accounts: [],
    }),
  );
  return {...(await dataSource.manager.remove(modifiedGroup)), id: group.id};
};

export const updateGroupModificationDate = (group: Group, date?: Date) =>
  dataSource.manager.save(new Group({...group, updatedAt: date ?? new Date()}));

export const findAllGroupsByAccountId = (accountId: Account['id']) =>
  dataSource
    .getRepository(Group)
    .createQueryBuilder('group')
    .innerJoin('group.accounts', 'account')
    .where('account.id = :accountId', {accountId})
    .getMany();
