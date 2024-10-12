import {drizzleDB} from '@/common/infra/drizzle/drizzle-db';
import {TagsRepo} from './tags-repo';
import {tags, tagsToTransactions} from '@/common/infra/drizzle/drizzle.schema';
import {Tag} from '../../domain/tag';
import {Transaction} from '@/features/transactions/domain/transaction';

export const makeDrizzleTagsRepo = (): TagsRepo => ({
    async findAllTags() {
        return [];
    },
    async createTag(input) {
        const createdTag = (
            await drizzleDB.insert(tags).values(input).returning()
        ).at(0);
        if (!createdTag) {
            throw new Error(
                `An error occured while creating the tag:\n{"tag": ${input}}`,
            );
        }

        return createdTag;
    },
    async relateTagToTransaction({tag, transaction}) {
        const createdTagToTransaction = (
            await drizzleDB
                .insert(tagsToTransactions)
                .values({tagId: tag.id, transactionId: transaction.id})
                .returning()
        ).at(0);
        if (!createdTagToTransaction) {
            throw new Error(
                `An error occured while relating the tag to the transaction:\n${JSON.stringify({tag, transaction})}`,
            );
        }

        return {
            tag: {...tag, transactions: [transaction]},
            transaction: {...transaction, tags: [tag]},
        };
    },
    async createTags(inputs) {
        return (
            await Promise.allSettled(
                inputs.map((input) => this.createTag(input)),
            )
        ).reduce(
            (createdTags: Tag[], promiseSettledTag) =>
                promiseSettledTag.status === 'fulfilled'
                    ? [promiseSettledTag.value, ...createdTags]
                    : createdTags,
            [],
        );
    },
    async relateTagsToTransaction(input) {
        const relatedTagsToTransaction = (
            await Promise.allSettled(
                input.tags.map((tag) =>
                    this.relateTagToTransaction({
                        tag,
                        transaction: input.transaction,
                    }),
                ),
            )
        ).reduce(
            (
                relatedTagsToTransaction: {
                    tag: Tag;
                    transaction: Transaction;
                }[],
                promiseSettledTagToTransaction,
            ) =>
                promiseSettledTagToTransaction.status === 'fulfilled'
                    ? [
                          promiseSettledTagToTransaction.value,
                          ...relatedTagsToTransaction,
                      ]
                    : relatedTagsToTransaction,
            [],
        );
        const relatedTags = relatedTagsToTransaction.map(
            (relatedTagToTransaction) => relatedTagToTransaction.tag,
        );
        return {
            tags: relatedTags,
            transaction: {...input.transaction, tags: relatedTags},
        };
    },
    async findTagByValueOrCreate(input) {
        const foundTag = await drizzleDB.query.tags.findFirst({
            where(fields, operators) {
                return operators.eq(fields.value, input.value);
            },
        });
        if (foundTag) {
            return foundTag;
        }
        return await this.createTag(input);
    },
    async findTagsByValueOrCreate(inputs) {
        const foundTags = await drizzleDB.query.tags.findMany({
            where(fields, operators) {
                return operators.inArray(
                    fields.value,
                    inputs.map((input) => input.value),
                );
            },
        });
        const indexedFoundTags = foundTags.reduce(
            (indexedFoundTags: Record<string, Tag | undefined>, foundTag) => ({
                ...indexedFoundTags,
                [foundTag.value]: foundTag,
            }),
            {},
        );
        const yetToCreateTags = inputs.filter(
            (input) => !indexedFoundTags[input.value],
        );
        return [...(await this.createTags(yetToCreateTags)), ...foundTags];
    },
});
