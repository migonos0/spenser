import {FlatList} from 'react-native';
import {useLooseRoute} from '../../hooks/use-loose-route';
import {useMessagesByTagId} from '../../state/message.state';
import {ScreenLayout} from '../layouts/screen.layout';
import {MessageCard} from '../components/message-card';
import {useAppTheme} from '../../hooks/use-app-theme';

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
        keyExtractor={item => item.id.toString()}
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
