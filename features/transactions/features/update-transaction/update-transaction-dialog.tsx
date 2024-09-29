import {FC, useEffect} from 'react';
import {Transaction} from '../../domain/transaction';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import {useUpdateTransaction} from './use-update-transaction';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {findTransactionValuesFromMessage} from '@/common/utilities/transaction-pattern-finders';
import {useBalance} from '../find-balance/use-balance';

type UpdateTransactionDialogProps = {
    transaction: Transaction;
    onDismiss: () => void;
    dismissLabel?: string;
    updateLabel?: string;
    isVisible: boolean;
};
export const UpdateTransactionDialog: FC<UpdateTransactionDialogProps> = ({
    transaction,
    onDismiss,
    dismissLabel = 'Dismiss',
    updateLabel = 'Update',
    isVisible,
}) => {
    const {updateTransaction} = useUpdateTransaction();
    const {handleSubmit, control, setValue} = useForm<{input: string}>({});
    const {replaceTransaction} = useBalance();

    useEffect(
        () =>
            setValue(
                'input',
                `${transaction.isExpense ? '-' : '+'}${transaction.amount} ${transaction.description}`,
            ),
        [setValue, transaction],
    );

    const handleOnSuccess = (updatedTransaction: Transaction) => {
        replaceTransaction(
            {
                oldTransaction: transaction,
                newTransaction: updatedTransaction,
            },
            {onSuccess: onDismiss},
        );
    };

    const submitHandler: SubmitHandler<{input: string}> = ({input}) => {
        const {amount, description, isExpense} =
            findTransactionValuesFromMessage(input);
        updateTransaction(
            {amount, description, isExpense, id: transaction.id},
            {
                onSuccess: handleOnSuccess,
            },
        );
    };

    return (
        <Portal>
            <Dialog visible={isVisible} onDismiss={onDismiss}>
                <Dialog.Content>
                    <Controller
                        control={control}
                        name="input"
                        rules={{required: true, minLength: 1}}
                        render={({field: {value, onChange}}) => (
                            <TextInput
                                autoFocus
                                value={value}
                                onChangeText={onChange}
                                className="w-full"
                                mode="outlined"
                                multiline
                            />
                        )}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>{dismissLabel}</Button>
                    <Button onPress={handleSubmit(submitHandler)}>
                        {updateLabel}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
