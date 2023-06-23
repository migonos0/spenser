import {ScreenLayout} from '../layouts/screen.layout';
import {useAppTheme} from '../../hooks/use-app-theme';
import {Card, Text} from 'react-native-paper';
import {useMessages} from '../../state/message.state';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {messages} = useMessages();

  return (
    <ScreenLayout colors={colors}>
      <Card>
        <Card.Content>
          {messages?.map((message, index) => (
            <Text key={index}>{message.description}</Text>
          ))}
          <Text>Me</Text>
        </Card.Content>
      </Card>
    </ScreenLayout>
  );
};
