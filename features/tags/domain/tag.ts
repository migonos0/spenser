import {Transaction} from '@/features/transactions/domain/transaction';

export type Tag = {
    id: number;
    value: string;
    transactions?: Transaction[];
};
