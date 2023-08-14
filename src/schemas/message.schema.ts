import {object, string} from 'zod';

export const MessageSchema = object({
  message: string({required_error: 'Please provide a valid message.'}),
});
