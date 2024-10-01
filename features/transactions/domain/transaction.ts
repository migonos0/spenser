import {Tag} from '@/features/tags/domain/tag';

export type Transaction = {
    id: number;
    description: string;
    isExpense: boolean;
    amount: number;
    tags?: Tag[];
};

export type TransactionInput = {
    description: Transaction['description'];
    isExpense: Transaction['isExpense'];
    amount?: Transaction['amount'];
};
