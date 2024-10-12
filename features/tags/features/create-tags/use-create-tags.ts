import {useDependency} from '@/common/hooks/use-dependency';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateTagsUseCase} from './create-tags.use-case';
import {queryKeys} from '@/common/constants/query-keys';
import {Tag} from '../../domain/tag';

export const useCreateTags = () => {
    const useCase: CreateTagsUseCase = useDependency('createTagsUseCase');

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(data) {
            queryClient.setQueryData<Tag[]>(queryKeys.tags, (cachedTags) => [
                ...data,
                ...(cachedTags ?? []),
            ]);
        },
    });

    return {createTags: mutate};
};
