import {
  EXPENSE_MESSAGE_PATTERNS,
  INCOME_MESSAGE_PATTERNS,
} from '../constants/message-patterns';
import {Transaction} from '../entities/transaction';

export const validateExpense = (transaction: string) =>
  EXPENSE_MESSAGE_PATTERNS.some(pattern =>
    transaction.toLowerCase().includes(pattern),
  );

export const findAmount = (transaction: string) =>
  transaction.match(/(\d+(\.\d{1,2}))|(\.\d{1,2})|(\d+)/)?.find(match => match);

export const findTags = (transaction: string) =>
  transaction.match(/#([A-z])\w*/g)?.map(tag => tag.replace('#', ''));

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

export const getCreatableTransactionFromString = (
  transaction: string,
  tagNames?: string[],
): Omit<Transaction, 'id' | 'tags' | 'account'> => {
  const isExpense = validateExpense(transaction);
  const stringifiedAmount = findAmount(transaction);
  const description = cleanTransactionDescription(
    transaction,
    isExpense,
    stringifiedAmount,
    tagNames,
  );
  const amount = Number(stringifiedAmount) * (isExpense ? -1 : 1);

  return {amount, description, isExpense};
};
