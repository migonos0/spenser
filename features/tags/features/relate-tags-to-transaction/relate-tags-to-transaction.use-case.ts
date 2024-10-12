import {Transaction} from '@/features/transactions/domain/transaction';
import {TagsRepo} from '../../common/infra/tags-repo';
import {Tag} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeRelateTagsToTransactionUseCase = ({
    tagsRepo,
}: Dependencies) => ({
    execute(input: {tags: Tag[]; transaction: Transaction}) {
        return tagsRepo.relateTagsToTransaction(input);
    },
});
export type RelateTagsToTransactionUseCase = ReturnType<
    typeof makeRelateTagsToTransactionUseCase
>;
