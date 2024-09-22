import {ChatButtonBox} from '@/common/components/chat-button-box';
import {useCreateTransaction} from './use-create-transaction';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {findTransactionValuesFromMessage} from '@/common/utilities/transaction-pattern-finders';

export const CreateTransactionChatBox = () => {
  const {createTransaction} = useCreateTransaction();
  const {control, handleSubmit, setValue} = useForm<{message: string}>();

  const cleanMessageTextField = () => setValue('message', '');

  const messageSubmitHandler: SubmitHandler<{message: string}> = ({
    message,
  }) => {
    const transactionValues = findTransactionValuesFromMessage(message);
    createTransaction(
      {
        isExpense: transactionValues.isExpense,
        description: transactionValues.description,
        amount: transactionValues.amount,
      },
      {onSuccess: cleanMessageTextField},
    );
  };

  return (
    <Controller
      control={control}
      name="message"
      render={({field: {onChange, value}}) => (
        <ChatButtonBox
          value={value}
          onChangeText={onChange}
          onSendButtonPress={handleSubmit(messageSubmitHandler)}
        />
      )}
    />
  );
};
