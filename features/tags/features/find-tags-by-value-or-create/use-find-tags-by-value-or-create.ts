import {useDependency} from '@/common/hooks/use-dependency';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {FindTagsByValueOrCreateUseCase} from './find-tags-by-value-or-create.use-case';
import {Tag} from '../../domain/tag';
import {queryKeys} from '@/common/constants/query-keys';

export const useFindTagsByValueOrCreate = () => {
    const useCase: FindTagsByValueOrCreateUseCase = useDependency(
        'findTagsByValueOrCreateUseCase',
    );

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(foundOrCreatedTags) {
            queryClient.setQueryData<Tag[]>(queryKeys.tags, (cachedTags) => {
                const indexedCachedTags = foundOrCreatedTags.reduce(
                    (
                        indexedCachedTags: Record<Tag['id'], Tag | undefined>,
                        foundOrCreatedTag,
                    ) => ({
                        ...indexedCachedTags,
                        [foundOrCreatedTag.id]: foundOrCreatedTag,
                    }),
                    {},
                );
                const nonCachedTags = foundOrCreatedTags.filter(
                    (tag) => !indexedCachedTags[tag.id],
                );
                return [...nonCachedTags, ...(cachedTags ?? [])];
            });
        },
    });

    return {findTagsByValueOrCreate: mutate};
};
