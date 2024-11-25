import {Transaction} from '@/features/transactions/domain/transaction';
import {TagsRepo} from '../../common/infra/tags-repo';
import {Tag} from '../../domain/tag';
import {UpdateTagToTransactionUseCase} from '../update-tag-to-transaction/update-tag-to-transaction.use-case';

type Dependencies = {
    tagsRepo: TagsRepo;
    updateTagToTransactionUseCase: UpdateTagToTransactionUseCase;
};
export const makeUpdateTagsToTransactionUseCase = ({
    tagsRepo,
    updateTagToTransactionUseCase,
}: Dependencies) => ({
    async execute(input: {transaction: Transaction; newTags: Tag[]}) {},
});
