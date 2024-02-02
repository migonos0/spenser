import {useMemo} from 'react';
import {Group} from '../entities/group';
import {
  useSWRImmutableOnInitializedDS,
  useSWRMutationOnInitializedDS,
} from '../hooks/use-swr';
import {
  createGroupDto,
  deleteGroup,
  findAllGroupDtos,
} from '../services/group.service';
import {swrKeyGetters} from '../utilities/swr-key-getters';
import {GroupDto} from '../dtos/group.dto';

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
    createGroupDto,
    (createdGroup, currentData: GroupDto[] | undefined) => {
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

export const useDeleteGroup = () => {
  const {trigger} = useSWRMutationOnInitializedDS(
    swrKeyGetters.getUseGroupDtosKey(),
    deleteGroup,
    (deletedGroup, currentData: GroupDto[] | undefined) => {
      if (!deletedGroup) {
        return currentData;
      }

      return currentData?.filter(groupDto => groupDto.id !== deletedGroup?.id);
    },
  );

  return {deleteGroupTrigger: trigger};
};
