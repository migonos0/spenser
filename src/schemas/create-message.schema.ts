import {Output, minLength, object, string} from 'valibot';

export const CreateTransactionSchema = object({
  transaction: string([minLength(1)]),
});
export type CreateTransactionData = Output<typeof CreateTransactionSchema>;
