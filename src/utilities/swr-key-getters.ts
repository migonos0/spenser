import {SWR_KEY_COMPONENTS} from '../constants/swr-key-components';
import {Tag} from '../entities/tag';
import {Tracker} from '../entities/tracker';

export const swrKeyGetters = {
  getUseMessagesKey: () => SWR_KEY_COMPONENTS.MESSAGES,
  getUseTagsKey: () => SWR_KEY_COMPONENTS.TAGS,
  getUseTrackerDtosKey: () => [
    SWR_KEY_COMPONENTS.TRACKERS,
    SWR_KEY_COMPONENTS.DTOS,
  ],
  getUseMessagesByTagIdKey: (tagId: Tag['id']) => [
    SWR_KEY_COMPONENTS.TAG,
    tagId,
  ],
  getUseMessagesByTrackerKey: (tracker: Tracker) => [
    SWR_KEY_COMPONENTS.MESSAGES,
    SWR_KEY_COMPONENTS.TRACKER,
    tracker,
  ],
  getUseTrackerByIdKey: (trackerId: Tracker['id']) => [
    SWR_KEY_COMPONENTS.TRACKER,
    trackerId,
  ],
};
