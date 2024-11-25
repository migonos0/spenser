import {Transaction} from '@/features/transactions/domain/transaction';
import {TagsRepo} from '../../common/infra/tags-repo';
import {Tag} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeUpdateTagToTransactionUseCase = ({
    tagsRepo,
}: Dependencies) => ({
    async execute(input: {transaction: Transaction; oldTag: Tag; newTag: Tag}) {
        await tagsRepo.unrelateTagToTransaction({
            tag: input.oldTag,
            transaction: input.transaction,
        });
        const relatedTagToTransaction = await tagsRepo.relateTagToTransaction({
            tag: input.newTag,
            transaction: input.transaction,
        });

        return relatedTagToTransaction;
    },
});
export type UpdateTagToTransactionUseCase = ReturnType<
    typeof makeUpdateTagToTransactionUseCase
>;
