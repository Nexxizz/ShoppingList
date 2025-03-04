"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DI = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const article_1 = require("./entities/article");
const list_1 = require("./entities/list");
const cors_1 = __importDefault(require("cors"));
const article_controller_1 = require("./controller/article.controller");
const list_controller_1 = require("./controller/list.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = 3000;
app.use(express_1.default.json()); // for parsing application/json
exports.DI = {};
const initializeServer = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const em = orm.em;
    exports.DI.orm = orm;
    exports.DI.em = em;
    exports.DI.articleRepository = em.getRepository(article_1.Article);
    exports.DI.listRepository = em.getRepository(list_1.List);
    app.use('/articles', article_controller_1.articleRouter);
    app.use('/lists', list_controller_1.listRouter);
    app.listen(PORT, () => {
        console.log(`Server running http://localhost:${PORT}`);
    });
};
initializeServer().catch((err) => {
    console.error(err);
});
