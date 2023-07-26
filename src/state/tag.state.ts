import {TAGS_TABLE_NAME} from '../constants/db';
import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/swr';
import {Tag} from '../schemas/tag.schema';
import {createTag, createTags, findAllTags} from '../service/tag.service';

export const useTags = () => {
  const {data} = useSWRSQLite(TAGS_TABLE_NAME, findAllTags);

  return {tags: data};
};

export const useCreateTag = () => {
  const {trigger} = useSWRSQLiteMutation(
    TAGS_TABLE_NAME,
    createTag,
    (result, currentData: Tag[] | undefined) => {
      if (!result) {
        return currentData;
      }
      console.log(result);
      return [...(currentData ?? []), ...[result]];
    },
  );

  return {createTagTrigger: trigger};
};

export const useCreateTags = () => {
  const {trigger} = useSWRSQLiteMutation(TAGS_TABLE_NAME, createTags);

  return {createTagsTrigger: trigger};
};
