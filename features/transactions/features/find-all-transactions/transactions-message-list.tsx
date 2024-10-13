import {FlatList} from 'react-native';
import {useTransactions} from './use-transactions';
import {TransactionCard} from '@/common/components/transaction-card';
import {Transaction} from '../../domain/transaction';
import {FC, useState} from 'react';
import {useDeleteTransaction} from '../delete-transaction/use-delete-transaction';
import {useBalance} from '../find-balance/use-balance';
import {UpdateTransactionDialog} from '../update-transaction/update-transaction-dialog';
import {useUnrelateTagsToTransaction} from '@/features/tags/features/unrelate-tags-to-transaction/use-unrelate-tags-to-transaction';

type TransactionsMessageListProps = {
    deleteButtonLabel: string;
    updateButtonLabel: string;
    dismissButtonLabel: string;
    expenseTransactionCardColor: string;
    incomeTransactionCardColor: string;
};

export const TransactionsMessageList: FC<TransactionsMessageListProps> = ({
    deleteButtonLabel,
    updateButtonLabel,
    dismissButtonLabel,
    expenseTransactionCardColor,
    incomeTransactionCardColor,
}) => {
    const {transactions} = useTransactions();
    const {removeTransaction} = useBalance();
    const {deleteTransaction} = useDeleteTransaction();
    const {unrelateTagsToTransaction} = useUnrelateTagsToTransaction();

    const [isUpdateDialogOpen, setIsUpdateDialogVisibility] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<
        Transaction | undefined
    >();

    const handleUpdateTransactionDialogDismiss = () =>
        setIsUpdateDialogVisibility(false);
    const handleDeleteTransactionSuccess = (transaction: Transaction) => {
        removeTransaction(transaction);
        unrelateTagsToTransaction({
            tags: transaction.tags ?? [],
            transaction: transaction,
        });
    };

    const makeHandleDeleteDialogItemPress = (item: Transaction) => () =>
        deleteTransaction(item, {
            onSuccess: handleDeleteTransactionSuccess,
        });
    const makeHandleUpdateDialogItemPress = (item: Transaction) => () => {
        setIsUpdateDialogVisibility(true);
        setSelectedTransaction(item);
    };

    const renderUpdateDialog = () => {
        if (!selectedTransaction) {
            return <></>;
        }
        return (
            <UpdateTransactionDialog
                isVisible={isUpdateDialogOpen}
                transaction={selectedTransaction}
                onDismiss={handleUpdateTransactionDialogDismiss}
                updateLabel={updateButtonLabel}
                dismissLabel={dismissButtonLabel}
            />
        );
    };

    return (
        <>
            <FlatList
                inverted
                data={transactions}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item: transaction}) => (
                    <TransactionCard
                        longPressDialogItems={[
                            {
                                title: deleteButtonLabel,
                                iconName: 'delete',
                                onPress:
                                    makeHandleDeleteDialogItemPress(
                                        transaction,
                                    ),
                            },
                            {
                                title: updateButtonLabel,
                                iconName: 'pencil',
                                onPress:
                                    makeHandleUpdateDialogItemPress(
                                        transaction,
                                    ),
                            },
                        ]}
                        class="my-2"
                        backgroundColor={
                            transaction.isExpense
                                ? expenseTransactionCardColor
                                : incomeTransactionCardColor
                        }
                        title={
                            (transaction.isExpense ? '- ' : '+ ') +
                            transaction.amount.toString()
                        }
                        body={transaction.description}
                        tags={transaction.tags?.map((tag) => ({
                            label: tag.value,
                        }))}
                    />
                )}
            />

            {renderUpdateDialog()}
        </>
    );
};
