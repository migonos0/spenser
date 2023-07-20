import {TypeOf, number, object, string} from 'zod';

export const TagSchema = object({
  id: number(),
  name: string(),
});
export type Tag = TypeOf<typeof TagSchema>;
