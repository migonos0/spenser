import {ChatButtonBox} from '@/common/components/chat-button-box';
import {useCreateTransaction} from './use-create-transaction';

export const CreateTransactionChatBox = () => {
  const {createTransaction} = useCreateTransaction();

  return <ChatButtonBox />;
};
