import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {MESSAGES_TABLE_NAME} from '../constants/db';
import {Message} from '../schemas/message.schema';
import {getInsertId} from '../lib/sqlite';
import {number} from 'zod';

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
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        messages.push(result.rows.item(index));
      }
    });
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

export const deleteMessage = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${MESSAGES_TABLE_NAME} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
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

  return +parsedMessageAmountSummatory.data.toFixed(2);
};
