import {ChatButtonBox} from '@/common/components/chat-button-box';
import {useCreateTransaction} from './use-create-transaction';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {findTransactionValuesFromMessage} from '@/common/utilities/transaction-pattern-finders';
import {useBalance} from '../find-balance/use-balance';
import {Transaction} from '../../domain/transaction';
import {FC, useEffect, useState} from 'react';
import {useRelateTagsToTransaction} from '@/features/tags/features/relate-tags-to-transaction/use-relate-tags-to-transaction';
import {Tag} from '@/features/tags/domain/tag';
import {useFindTagsByValueOrCreate} from '@/features/tags/features/find-tags-by-value-or-create/use-find-tags-by-value-or-create';

type CreateTransactionChatBoxProps = {
    sendButtonLabel: string;
};

export const CreateTransactionChatBox: FC<CreateTransactionChatBoxProps> = ({
    sendButtonLabel,
}) => {
    const {createTransaction} = useCreateTransaction();
    const {control, handleSubmit, setValue} = useForm<{message: string}>();
    const {addTransaction} = useBalance();
    const {findTagsByValueOrCreate} = useFindTagsByValueOrCreate();
    const {relateTagsToTransaction} = useRelateTagsToTransaction();
    const [createdTransaction, setCreatedTransaction] = useState<
        Transaction | undefined
    >();
    const [foundOrCreatedTags, setFoundOrCreatedTags] = useState<
        Tag[] | undefined
    >();

    const handleCreateTransactionSuccess = (transaction: Transaction) => {
        setValue('message', '');
        addTransaction(transaction);
        setCreatedTransaction(transaction);
    };
    const handleRelateTagsToTransactionSuccess = () => {
        setFoundOrCreatedTags(undefined);
        setCreatedTransaction(undefined);
    };

    const messageSubmitHandler: SubmitHandler<{message: string}> = ({
        message,
    }) => {
        const transactionValues = findTransactionValuesFromMessage(message);
        createTransaction(
            {
                isExpense: transactionValues.isExpense,
                description: transactionValues.description,
                amount: transactionValues.amount,
            },
            {onSuccess: handleCreateTransactionSuccess},
        );
        findTagsByValueOrCreate(
            transactionValues.tags.map((tag) => ({value: tag})),
            {onSuccess: setFoundOrCreatedTags},
        );
    };

    useEffect(() => {
        if (!foundOrCreatedTags || !createdTransaction) {
            return;
        }
        relateTagsToTransaction(
            {
                transaction: createdTransaction,
                tags: foundOrCreatedTags,
            },
            {onSuccess: handleRelateTagsToTransactionSuccess},
        );
    }, [foundOrCreatedTags, createdTransaction, relateTagsToTransaction]);

    return (
        <Controller
            control={control}
            name="message"
            rules={{required: true, minLength: 1}}
            render={({field: {onChange, value}}) => (
                <ChatButtonBox
                    sendButtonLabel={sendButtonLabel}
                    value={value}
                    onChangeText={onChange}
                    onSendButtonPress={handleSubmit(messageSubmitHandler)}
                />
            )}
        />
    );
};
