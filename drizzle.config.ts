import type {Config} from 'drizzle-kit';

export default {
    schema: ['./common/infra/drizzle/drizzle.schema.ts'],
    out: './common/infra/drizzle/migrations',
    dialect: 'sqlite',
    driver: 'expo', // <--- very important
} satisfies Config;
