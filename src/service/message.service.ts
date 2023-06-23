import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {MESSAGES_TABLE_NAME} from '../constants/db';
import {Message} from '../schemas/message.schema';
import {getInsertId} from '../lib/sqlite';

export const createMessagesTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${MESSAGES_TABLE_NAME}(
        is_income INTEGER NOT NULL,
        amount NUMERIC NOT NULL,
        description TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const findAllMessages = async (db: SQLiteDatabase) => {
  const messages: Message[] = [];
  const results = await db.executeSql(
    `SELECT rowid as id, is_income as isIncome, amount, description FROM ${MESSAGES_TABLE_NAME}`,
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
    ${MESSAGES_TABLE_NAME}(is_income, amount, description) values (
    ${+message.isIncome}, 
    ${message.amount}, 
    '${message.description}')`;

    const result = await db.executeSql(insertQuery);

    return {...message, id: getInsertId(result)};
  };

export const deleteMessage = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${MESSAGES_TABLE_NAME} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteMessagesTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${MESSAGES_TABLE_NAME}`;

  await db.executeSql(query);
};
