import {Transaction} from '@/features/transactions/domain/transaction';
import {TagsRepo} from '../../common/infra/tags-repo';
import {Tag} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeUnrelateTagToTransactionUseCase = ({
    tagsRepo,
}: Dependencies) => ({
    execute(input: {tag: Tag; transaction: Transaction}) {
        return tagsRepo.unrelateTagToTransaction(input);
    },
});
export type UnrelateTagToTransactionUseCase = ReturnType<
    typeof makeUnrelateTagToTransactionUseCase
>;
