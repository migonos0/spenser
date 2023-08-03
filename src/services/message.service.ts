import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {MESSAGES_TABLE_NAME} from '../constants/db';
import {Message} from '../schemas/message.schema';
import {getInsertId, validateRowAffectation} from '../lib/sqlite';
import {number} from 'zod';
import {
  createMessagesTags,
  deleteMessagesTagsByMessageId,
  findAllMessagesTagsByMessageId,
  findAllMessagesTagsByTagId,
} from './message-tag.service';
import {Tag} from '../schemas/tag.schema';
import {deleteTagById, findTagById} from './tag.service';

export const createMessagesTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${MESSAGES_TABLE_NAME}(
        is_expense INTEGER NOT NULL,
        amount NUMERIC NOT NULL,
        description TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const findAllMessages =
  ({ascendant}: {ascendant?: boolean}) =>
  async (db: SQLiteDatabase) => {
    const messages: Message[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id, is_expense as isExpense, amount, description FROM ${MESSAGES_TABLE_NAME}${
        ascendant ? ' ORDER BY id asc' : ' ORDER BY id desc'
      }`,
    );
    for (const result of results) {
      for (let index = 0; index < result.rows.length; index++) {
        messages.push(result.rows.item(index));
      }
    }
    return messages;
  };

export const createMessage =
  (message: Omit<Message, 'id'>) => async (db: SQLiteDatabase) => {
    const insertQuery = `INSERT OR REPLACE INTO 
    ${MESSAGES_TABLE_NAME}(is_expense, amount, description) values (
    ${+message.isExpense}, 
    ${message.amount}, 
    '${message.description}')`;

    const result = await db.executeSql(insertQuery);

    return {...message, id: getInsertId(result)};
  };

export const deleteMessageById = (id: number) => async (db: SQLiteDatabase) => {
  const deleteQuery = `DELETE from ${MESSAGES_TABLE_NAME} where rowid = ${id}`;
  const response = await db.executeSql(deleteQuery);
  validateRowAffectation(response);

  return id;
};

export const dropMessagesTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE ${MESSAGES_TABLE_NAME}`;

  await db.executeSql(query);
};

export const findMessageAmountSummatory = async (db: SQLiteDatabase) => {
  const query = `SELECT SUM(amount) as messageAmountSummatory FROM ${MESSAGES_TABLE_NAME}`;

  const results = await db.executeSql(query);

  const parsedMessageAmountSummatory = number().safeParse(
    results[0].rows.item(0).messageAmountSummatory,
  );

  if (!parsedMessageAmountSummatory.success) {
    return 0;
  }

  return parsedMessageAmountSummatory.data;
};

export const findAllMessagesWithTags =
  ({ascendant}: {ascendant?: boolean}) =>
  async (db: SQLiteDatabase) => {
    const messagesWithTags: (Message & {tags: Tag[]})[] = [];

    const messages = await findAllMessages({ascendant: ascendant})(db);
    for (const message of messages) {
      const messageTagIds = (
        await findAllMessagesTagsByMessageId(message.id)(db)
      ).map(messageTag => messageTag.tagId);

      const tags: Tag[] = [];
      for (const messageTagId of messageTagIds) {
        const foundTag = await findTagById(messageTagId)(db);
        if (!foundTag) {
          continue;
        }
        tags.push(foundTag);
      }
      messagesWithTags.push({...message, tags});
    }

    return messagesWithTags;
  };

export const createMessageWithTags =
  (input: {message: Omit<Message, 'id'>; tags: Tag[]}) =>
  async (db: SQLiteDatabase) => {
    const createdMessage = await createMessage(input.message)(db);
    await createMessagesTags(
      input.tags.map(tag => ({tagId: tag.id, messageId: createdMessage.id})),
    )(db);

    return {...createdMessage, tags: input.tags};
  };

export const deleteMessageWithTagsById =
  (input: {messageId: Message['id']; tags: Tag[]}) =>
  async (db: SQLiteDatabase) => {
    const deletedMessageId = await deleteMessageById(input.messageId)(db);
    const deletedTagIds: Tag['id'][] = [];
    for (const tag of input.tags) {
      const foundMessagesTags = await findAllMessagesTagsByTagId(tag.id)(db);
      if (foundMessagesTags.length > 0) {
        continue;
      }
      const deletedTagId = await deleteTagById(tag.id)(db);
      deletedTagIds.push(deletedTagId);
    }

    if (input.tags.length < 1) {
      return {deletedMessageId, deletedTagIds};
    }

    await deleteMessagesTagsByMessageId(input.messageId)(db);
    return {deletedMessageId, deletedTagIds};
  };
