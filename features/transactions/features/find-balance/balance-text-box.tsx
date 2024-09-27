import {Text} from 'react-native';
import {useBalance} from './use-balance';
import {cn} from '@/common/utilities/cn';
import {FC} from 'react';

type BalanceTextBoxProps = {
  clazz?: string;
};

export const BalanceTextBox: FC<BalanceTextBoxProps> = ({clazz}) => {
  const {balance} = useBalance();

  return <Text className={cn(clazz)}>{balance}</Text>;
};
