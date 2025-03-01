import dotenv from 'dotenv';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';

dotenv.config();

export default defineConfig({
    entities: [],
    clientUrl: process.env.DATABASE_URL,
    debug: process.env.NODE_ENV !== 'production',
    driver: PostgreSqlDriver,
});