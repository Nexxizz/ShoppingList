import dotenv from 'dotenv';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { List } from "./entities/list";
import { Article } from "./entities/article";

dotenv.config();

export default defineConfig({
    entities: [Article, List],
    clientUrl: process.env.DATABASE_URL,
    debug: process.env.NODE_ENV !== 'production',
    driver: PostgreSqlDriver,
});