import type {Config} from 'drizzle-kit';

export default {
  schema: ['./infra/drizzle/schema.ts'],
  out: './infra/drizzle/migrations',
  dialect: 'sqlite',
  driver: 'expo', // <--- very important
} satisfies Config;
