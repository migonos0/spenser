import {
  Output,
  array,
  minLength,
  number,
  object,
  string,
  undefined_,
  union,
} from 'valibot';
import {LOCALE} from '../constants/locale';
import {Group} from '../entities/group';

export const CreateGroupSchema = object({
  name: string(LOCALE.schemaErrors.common.properValue, [
    minLength(1, LOCALE.schemaErrors.common.properValue),
  ]),
  description: string(LOCALE.schemaErrors.common.properValue, [
    minLength(1, LOCALE.schemaErrors.common.properValue),
  ]),
  accounts: union([
    undefined_(),
    array(object({id: union([number(), undefined_()])})),
  ]),
});
export type CreateGroupData = Omit<
  Output<typeof CreateGroupSchema>,
  'accounts'
> & {accounts: Group['accounts']};
