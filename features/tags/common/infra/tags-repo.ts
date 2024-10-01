import {Tag} from '../../domain/tag';

export type TagsRepo = {
    findAllTags(): Promise<Tag[]>;
};
