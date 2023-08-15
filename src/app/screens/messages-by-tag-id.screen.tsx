import {FlatList} from 'react-native';

import {useAppTheme} from '../../hooks/use-app-theme';
import {useLooseRoute} from '../../hooks/use-loose-route';
import {useMessagesByTagId} from '../../state/tag.state';
import {MessageCard} from '../components/message-card';
import {ScreenLayout} from '../layouts/screen.layout';

export const MessagesByTagIdScreen = () => {
  const {params} = useLooseRoute();
  const tagId = params?.tagId;
  const {messages} = useMessagesByTagId(+(tagId ?? -1));
  const {colors} = useAppTheme();

  return (
    <ScreenLayout>
      <FlatList
        className="px-4"
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: message}) => (
          <MessageCard
            twClass="m-2"
            backgroundColor={
              message.isExpense
                ? colors.tertiaryContainer
                : colors.surfaceVariant
            }
            cardTitle={
              (!message.isExpense ? '+' : '') + message.amount.toString()
            }
            body={message.description}
          />
        )}
      />
    </ScreenLayout>
  );
};
