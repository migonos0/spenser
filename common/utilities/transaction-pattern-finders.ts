import * as MESSAGE_PATTERNS from '../../assets/message-patterns.json';

const EXPENSE_MESSAGE_PATTERNS = MESSAGE_PATTERNS.expenseMessagePatterns;
const INCOME_MESSAGE_PATTERNS = MESSAGE_PATTERNS.incomeMessagePatterns;

const findAmount = (transaction: string) => {
  const stringifiedAmount = transaction
    .match(/(\d+(\.\d{1,2}))|(\.\d{1,2})|(\d+)/)
    ?.find(match => match);
  return !stringifiedAmount || isNaN(+stringifiedAmount)
    ? 0
    : +stringifiedAmount;
};

const findTags = (transaction: string) =>
  transaction.match(/#([A-z])\w*/g)?.map(tag => tag.replace('#', '')) ?? [];

export const findTransactionValuesFromMessage = (message: string) => {
  const foundExpensePattern = EXPENSE_MESSAGE_PATTERNS.find(pattern =>
    message.includes(pattern),
  );
  const foundIncomePattern = INCOME_MESSAGE_PATTERNS.find(pattern =>
    message.includes(pattern),
  );
  const isExpense = !!foundExpensePattern && !foundIncomePattern;
  const messageWithoutExpenseOrIncomePattern = isExpense
    ? message.replace(foundExpensePattern, '')
    : message.replace(foundIncomePattern ?? '', '');

  const amount = findAmount(message);
  const messageWithoutAmount = messageWithoutExpenseOrIncomePattern.replace(
    amount.toString(),
    '',
  );

  const tags = findTags(messageWithoutAmount);
  const messageWithoutTags = tags.reduce((message, tag) => {
    return message.replace(`#${tag}`, '');
  }, messageWithoutAmount);

  const description = messageWithoutTags.trim();

  return {amount, isExpense, tags, description};
};
