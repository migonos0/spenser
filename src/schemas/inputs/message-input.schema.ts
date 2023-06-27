import {object, string} from 'zod';

export const MessageInputSchema = object({
  message: string({required_error: 'Please provide a valid message.'}),
});
