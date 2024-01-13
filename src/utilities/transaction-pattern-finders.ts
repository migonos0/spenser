import {
  EXPENSE_MESSAGE_PATTERNS,
  INCOME_MESSAGE_PATTERNS,
} from '../constants/message-patterns';

export const validateExpense = (transaction: string) =>
  EXPENSE_MESSAGE_PATTERNS.some(pattern =>
    transaction.toLowerCase().includes(pattern),
  );

export const findTransactionCategoryAndMatchingPattern = (
  transaction: string,
) => {
  for (const matchingPattern of EXPENSE_MESSAGE_PATTERNS) {
    const indexOfPattern = transaction.indexOf(matchingPattern);
    if (indexOfPattern < 0) {
      continue;
    }
    return {isExpense: true, matchingPattern};
  }
  for (const matchingPattern of INCOME_MESSAGE_PATTERNS) {
    const indexOfPattern = transaction.indexOf(matchingPattern);
    if (indexOfPattern < 0) {
      continue;
    }
    return {isExpense: false, matchingPattern};
  }
  return {isExpense: false, matchingPattern: undefined};
};

export const findAmount = (transaction: string) => {
  const stringifiedAmount = transaction
    .match(/(\d+(\.\d{1,2}))|(\.\d{1,2})|(\d+)/)
    ?.find(match => match);
  return !stringifiedAmount || isNaN(+stringifiedAmount)
    ? 0
    : +stringifiedAmount;
};

export const findTags = (transaction: string) =>
  transaction.match(/#([A-z])\w*/g)?.map(tag => tag.replace('#', ''));

export const findDescription = (input: {
  transaction: string;
  amount: number;
  tags: string[];
  transactionCategoryMatchingPattern?: string;
}) => {
  const arr = [
    ...(input.amount !== 0 ? [input.amount] : []),
    ...input.tags.map(tag => '#' + tag),
    ...(input.transactionCategoryMatchingPattern
      ? [input.transactionCategoryMatchingPattern]
      : []),
  ];
  let regex = new RegExp('\\b' + arr.join('|') + '\\b', 'gi');
  return input.transaction.replace(regex, '');
};

export const cleanTransactionDescription = (
  transaction: string,
  isExpense?: boolean,
  stringifiedAmount?: string,
  tags?: string[],
) => {
  let description = transaction.slice();
  description = isExpense
    ? cleanPatterns(description, EXPENSE_MESSAGE_PATTERNS)
    : cleanPatterns(description, INCOME_MESSAGE_PATTERNS);
  description = stringifiedAmount
    ? cleanPattern(description, stringifiedAmount)
    : description;
  description = tags
    ? cleanPatterns(
        description,
        tags.map(tag => '#' + tag),
      )
    : description;

  return description.trim();
};

export const cleanPatterns = (transaction: string, patterns: string[]) => {
  let cleanTransaction = transaction.slice().toLowerCase();
  for (const expensePattern of patterns) {
    cleanTransaction = cleanTransaction.replace(expensePattern, '');
  }
  return cleanTransaction;
};

export const cleanPattern = (message: string, pattern: string) => {
  return cleanPatterns(message, [pattern]);
};
