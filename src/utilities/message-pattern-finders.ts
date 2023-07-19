import {
  EXPENSE_MESSAGE_PATTERNS,
  INCOME_MESSAGE_PATTERNS,
} from '../constants/message-patterns';

export const validateExpense = (message: string) =>
  EXPENSE_MESSAGE_PATTERNS.some(pattern =>
    message.toLowerCase().includes(pattern),
  );

export const findAmount = (message: string) =>
  message.match(/([1-9]\d*(\.\d+)?)|(\.[1-9]\d*)/)?.find(match => match);

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
  let cleanMessage = message.slice();
  for (const expensePattern of patterns) {
    cleanMessage = cleanMessage.replace(expensePattern, '');
  }
  return cleanMessage;
};

export const cleanPattern = (message: string, pattern: string) => {
  return cleanPatterns(message, [pattern]);
};
