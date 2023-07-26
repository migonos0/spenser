import {MenuItem} from '../app/components/app-bar';
import {dropMessagesTagsTable} from '../service/message-tag.service';
import {dropMessagesTable} from '../service/message.service';
import {dropTagsTable} from '../service/tag.service';
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
