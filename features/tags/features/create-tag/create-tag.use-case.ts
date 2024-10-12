import {TagsRepo} from '../../common/infra/tags-repo';
import {TagInput} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeCreateTagUseCase = ({tagsRepo}: Dependencies) => ({
    execute(input: TagInput) {
        return tagsRepo.createTag(input);
    },
});
export type CreateTagUseCase = ReturnType<typeof makeCreateTagUseCase>;
