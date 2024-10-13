import {Transaction} from '@/features/transactions/domain/transaction';
import {Tag, TagInput} from '../../domain/tag';

export type TagsRepo = {
    findAllTags(): Promise<Tag[]>;
    createTag(input: TagInput): Promise<Tag>;
    createTags(inputs: TagInput[]): Promise<Tag[]>;
    relateTagToTransaction(input: {
        tag: Tag;
        transaction: Transaction;
    }): Promise<{tag: Tag; transaction: Transaction}>;
    relateTagsToTransaction(input: {
        tags: Tag[];
        transaction: Transaction;
    }): Promise<{tags: Tag[]; transaction: Transaction}>;
    findTagByValueOrCreate(input: TagInput): Promise<Tag>;
    findTagsByValueOrCreate(inputs: TagInput[]): Promise<Tag[]>;
    unrelateTagToTransaction(input: {
        tag: Tag;
        transaction: Transaction;
    }): Promise<{tag: Tag; transaction: Transaction}>;
    unrelateTagsToTransaction(input: {
        tags: Tag[];
        transaction: Transaction;
    }): Promise<{
        tags: Tag[];
        transaction: Transaction;
    }>;
};
