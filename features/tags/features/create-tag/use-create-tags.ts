import {useDependency} from '@/common/hooks/use-dependency';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateTagUseCase} from './create-tag.use-case';
import {Tag} from '../../domain/tag';
import {queryKeys} from '@/common/constants/query-keys';

export const useCreateTag = () => {
    const createTagUseCase: CreateTagUseCase =
        useDependency('createTagUseCase');

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: createTagUseCase.execute,
        onSuccess(data) {
            queryClient.setQueryData<Tag[]>(queryKeys.tags, (state) => [
                data,
                ...(state ?? []),
            ]);
        },
    });

    return {createTag: mutate};
};
