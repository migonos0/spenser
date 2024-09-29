import {CreateTransactionChatBox} from '@/features/transactions/features/create-transaction/create-transaction-chat-box';
import {TransactionsMessageList} from '@/features/transactions/features/find-all-transactions/transactions-message-list';
import {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {AppBarContext} from './_layout';
import {useBalance} from '@/features/transactions/features/find-balance/use-balance';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';

export default function Index() {
    const {t} = useTranslation();
    const {colors} = useTheme();

    const appbarContext = useContext(AppBarContext);

    const {balance} = useBalance();

    useEffect(() => {
        if (!balance || balance === 0 || !appbarContext) {
            return;
        }
        appbarContext.setTitle(balance.toString());
    }, [appbarContext, balance]);

    return (
        <>
            <View className="h-full px-4 pb-4">
                <TransactionsMessageList
                    incomeTransactionCardColor={colors.surfaceVariant}
                    expenseTransactionCardColor={colors.tertiaryContainer}
                    deleteButtonLabel={t('common.delete')}
                    updateButtonLabel={t('common.update')}
                    dismissButtonLabel={t('common.dismiss')}
                />
                <CreateTransactionChatBox sendButtonLabel={t('common.send')} />
            </View>
        </>
    );
}
