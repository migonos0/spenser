import {TagsRepo} from '../../common/infra/tags-repo';
import {TagInput} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeCreateTagsUseCase = ({tagsRepo}: Dependencies) => ({
    execute(input: TagInput[]) {
        return tagsRepo.createTags(input);
    },
});
export type CreateTagsUseCase = ReturnType<typeof makeCreateTagsUseCase>;
