import {TagsRepo} from '../../common/infra/tags-repo';
import {TagInput} from '../../domain/tag';

type Dependencies = {
    tagsRepo: TagsRepo;
};
export const makeFindTagsByValueOrCreateUseCase = ({
    tagsRepo,
}: Dependencies) => ({
    execute(input: TagInput[]) {
        return tagsRepo.findTagsByValueOrCreate(input);
    },
});
export type FindTagsByValueOrCreateUseCase = ReturnType<
    typeof makeFindTagsByValueOrCreateUseCase
>;
