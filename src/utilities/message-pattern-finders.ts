import {
  EXPENSE_MESSAGE_PATTERNS,
  INCOME_MESSAGE_PATTERNS,
} from '../constants/message-patterns';
import {Message} from '../entities/message';

export const validateExpense = (message: string) =>
  EXPENSE_MESSAGE_PATTERNS.some(pattern =>
    message.toLowerCase().includes(pattern),
  );

export const findAmount = (message: string) =>
  message.match(/(\d+(\.\d{1,2}))|(\.\d{1,2})|(\d+)/)?.find(match => match);

export const findTags = (message: string) =>
  message.match(/#([A-z])\w*/g)?.map(tag => tag.replace('#', ''));

export const cleanMessageDescription = (
  message: string,
  isExpense?: boolean,
  stringifiedAmount?: string,
  tags?: string[],
) => {
  let description = message.slice();
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

export const cleanPatterns = (message: string, patterns: string[]) => {
  let cleanMessage = message.slice().toLowerCase();
  for (const expensePattern of patterns) {
    cleanMessage = cleanMessage.replace(expensePattern, '');
  }
  return cleanMessage;
};

export const cleanPattern = (message: string, pattern: string) => {
  return cleanPatterns(message, [pattern]);
};

export const getCreatableMessageFromString = (
  message: string,
  tagNames?: string[],
): Omit<Message, 'id' | 'tags'> => {
  const isExpense = validateExpense(message);
  const stringifiedAmount = findAmount(message);
  const description = cleanMessageDescription(
    message,
    isExpense,
    stringifiedAmount,
    tagNames,
  );
  const amount = Number(stringifiedAmount) * (isExpense ? -1 : 1);

  return {amount, description, isExpense};
};
