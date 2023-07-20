import {TypeOf, number, object} from 'zod';
import {MessageSchema} from './message.schema';
import {TagSchema} from './tag.schema';

export const MessageTagSchema = object({
  id: number(),
  messageId: MessageSchema.shape.id,
  tagId: TagSchema.shape.id,
});
export type MessageTag = TypeOf<typeof MessageTagSchema>;
