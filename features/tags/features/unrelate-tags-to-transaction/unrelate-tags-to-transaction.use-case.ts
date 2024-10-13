import {Transaction} from '@/features/transactions/domain/transaction';
import {TagsRepo} from '../../common/infra/tags-repo';
import {Tag} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeUnrelateTagsToTransactionUseCase = ({
    tagsRepo,
}: Dependencies) => ({
    execute(input: {tags: Tag[]; transaction: Transaction}) {
        return tagsRepo.unrelateTagsToTransaction(input);
    },
});
export type UnrelateTagsToTransactionUseCase = ReturnType<
    typeof makeUnrelateTagsToTransactionUseCase
>;
