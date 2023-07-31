import {TAGS_TABLE_NAME} from '../constants/db';
import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/use-swr';
import {Tag} from '../schemas/tag.schema';
import {createTags, findAllTags} from '../services/tag.service';

export const useTags = () => {
  const {data} = useSWRSQLite(TAGS_TABLE_NAME, findAllTags);

  return {tags: data};
};

export const useCreateTags = () => {
  const {trigger} = useSWRSQLiteMutation(
    TAGS_TABLE_NAME,
    createTags,
    (result, currentData: Tag[] | undefined) => {
      if (!result) {
        return currentData;
      }
      return [...(currentData ?? []), ...result];
    },
  );

  return {createTagsTrigger: trigger};
};
