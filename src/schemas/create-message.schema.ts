import {Output, minLength, object, string} from 'valibot';

export const CreateMessageSchema = object({
  message: string([minLength(1)]),
});
export type CreateMessageData = Output<typeof CreateMessageSchema>;
