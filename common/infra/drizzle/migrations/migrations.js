// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_secret_xavin.sql';
import m0001 from './0001_flat_glorian.sql';
import m0002 from './0002_strong_blink.sql';
import m0003 from './0003_volatile_slipstream.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003
    }
  }
  