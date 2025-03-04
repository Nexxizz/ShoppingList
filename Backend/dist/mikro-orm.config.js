"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const postgresql_1 = require("@mikro-orm/postgresql");
const list_1 = require("./entities/list");
const article_1 = require("./entities/article");
dotenv_1.default.config();
exports.default = (0, postgresql_1.defineConfig)({
    entities: [article_1.Article, list_1.List],
    clientUrl: process.env.DATABASE_URL,
    debug: process.env.NODE_ENV !== 'production',
    driver: postgresql_1.PostgreSqlDriver,
});
