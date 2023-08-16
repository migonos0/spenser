import {Output, minLength, object, string} from 'valibot';

export const CreateTrackerSchema = object({
  name: string('Please provide a valid value', [
    minLength(1, 'Please provide a valid value'),
  ]),
  description: string('Please provide a valid value', [
    minLength(1, 'Please provide a valid value'),
  ]),
});
export type CreateTrackerData = Output<typeof CreateTrackerSchema>;
