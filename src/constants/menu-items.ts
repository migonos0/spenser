import {MenuItem} from '../app/components/app-bar';
import {dropMessagesTable} from '../service/message.service';
import {sqliteStoreActions} from '../stores/sqlite.store';

export const DEVELOPER_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Drop tables',
    onTouch() {
      sqliteStoreActions.setWithSqliteDatabase(db => dropMessagesTable(db));
    },
  },
];
