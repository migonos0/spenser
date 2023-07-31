import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {MESSAGES_TAGS_TABLE_NAME} from '../constants/db';
import {Message} from '../schemas/message.schema';
import {getInsertId, validateRowAffectation} from '../lib/sqlite';
import {MessageTag} from '../schemas/message-tag.schema';
import {Tag} from '../schemas/tag.schema';

export const createMessagesTagsTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${MESSAGES_TAGS_TABLE_NAME}(
        message_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL
    );`;

  await db.executeSql(query);
};

export const findAllMessagesTags = async (db: SQLiteDatabase) => {
  const messagesTags: MessageTag[] = [];
  const results = await db.executeSql(
    `SELECT rowid as id, message_id as messageId, tag_id as tagId FROM ${MESSAGES_TAGS_TABLE_NAME}`,
  );
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      messagesTags.push(result.rows.item(index));
    }
  });
  return messagesTags;
};

export const createMessagesTags =
  (input: {messageId: Message['id']; tagId: Tag['id']}[]) =>
  async (db: SQLiteDatabase): Promise<MessageTag[]> => {
    if (input.length < 1) {
      return [];
    }
    const insertQuery = `INSERT OR REPLACE INTO 
    ${MESSAGES_TAGS_TABLE_NAME}(message_id, tag_id) values ${input
      .map(messageTag => `(${messageTag.messageId}, ${messageTag.tagId})`)
      .join(',')}`;

    const result = await db.executeSql(insertQuery);
    const lastInsertedTagId = getInsertId(result);

    return input.map((messageTag, index) => ({
      ...messageTag,
      id: lastInsertedTagId - input.length + index + 1,
    }));
  };

export const deleteMessageTag = (id: number) => async (db: SQLiteDatabase) => {
  const deleteQuery = `DELETE from ${MESSAGES_TAGS_TABLE_NAME} where rowid = ${id}`;
  const response = await db.executeSql(deleteQuery);
  validateRowAffectation(response);

  return id;
};

export const dropMessagesTagsTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE ${MESSAGES_TAGS_TABLE_NAME}`;

  await db.executeSql(query);
};
