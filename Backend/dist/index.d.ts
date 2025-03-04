import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { Article } from './entities/article';
import { List } from './entities/list';
import http from "http";
export declare const DI: {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    articleRepository: EntityRepository<Article>;
    listRepository: EntityRepository<List>;
};
