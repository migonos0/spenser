import {Output, minLength, object, string} from 'valibot';
import {LOCALE} from '../constants/locale';

export const CreateTrackerSchema = object({
  name: string(LOCALE.schemaErrors.common.properValue, [
    minLength(1, LOCALE.schemaErrors.common.properValue),
  ]),
  description: string(LOCALE.schemaErrors.common.properValue, [
    minLength(1, LOCALE.schemaErrors.common.properValue),
  ]),
});
export type CreateTrackerData = Output<typeof CreateTrackerSchema>;
