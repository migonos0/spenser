import {useMemo} from 'react';
import {Group} from '../entities/group';
import {
  useSWRImmutableOnInitializedDS,
  useSWRMutationOnInitializedDS,
} from '../hooks/use-swr';
import {createGroup, findAllGroupDtos} from '../services/group.service';
import {swrKeyGetters} from '../utilities/swr-key-getters';

export const useGroupDtos = () => {
  const {data} = useSWRImmutableOnInitializedDS(
    swrKeyGetters.getUseGroupDtosKey(),
    findAllGroupDtos,
  );

  return {groupDtos: data};
};

export const useCreateGroup = () => {
  const {trigger} = useSWRMutationOnInitializedDS(
    swrKeyGetters.getUseGroupDtosKey(),
    createGroup,
    (createdGroup, currentData: Group[] | undefined) => {
      if (!createdGroup) {
        return currentData;
      }
      return [createdGroup, ...(currentData ?? [])];
    },
  );

  return {createGroupTrigger: trigger};
};

export const useGroupDtoById = (groupId: Group['id']) => {
  const {groupDtos} = useGroupDtos();

  const foundGroupDto = useMemo(
    () => groupDtos?.find(groupDto => groupDto.id === groupId),
    [groupDtos, groupId],
  );

  return {groupDto: foundGroupDto};
};
