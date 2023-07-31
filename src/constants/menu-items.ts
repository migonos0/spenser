import {MenuItem} from '../app/components/app-bar';
import {dropMessagesTagsTable} from '../services/message-tag.service';
import {dropMessagesTable} from '../services/message.service';
import {dropTagsTable} from '../services/tag.service';
import {sqliteStoreActions} from '../stores/sqlite.store';

export const DEVELOPER_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Drop tables',
    onTouch() {
      sqliteStoreActions.setWithSqliteDatabase(db => {
        dropMessagesTagsTable(db);
        dropTagsTable(db);
        dropMessagesTable(db);
      });
    },
  },
];
