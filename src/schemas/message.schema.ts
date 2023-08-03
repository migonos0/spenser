import {TypeOf, boolean, number, object, string} from 'zod';
import {Tag} from './tag.schema';

export const MessageSchema = object({
  id: number(),
  isExpense: boolean(),
  amount: number(),
  description: string(),
});

export type Message = TypeOf<typeof MessageSchema>;
export type MessageWithTags = Message & {tags: Tag[]};
