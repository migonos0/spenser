import {Transaction} from '@/features/transactions/domain/transaction';
import {TagsRepo} from '../../common/infra/tags-repo';
import {Tag} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeRelateTagToTransactionUseCase = ({
    tagsRepo,
}: Dependencies) => ({
    execute(input: {tag: Tag; transaction: Transaction}) {
        return tagsRepo.relateTagToTransaction(input);
    },
});
export type RelateTagToTransactionUseCase = ReturnType<
    typeof makeRelateTagToTransactionUseCase
>;
