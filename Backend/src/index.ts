import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import { Article } from './entities/article';
import { List } from './entities/list';
import http from "http";
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json()); // for parsing application/json

export const DI = {} as {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    articleRepository: EntityRepository<Article>;
    listRepository: EntityRepository<List>;
};



const initializeServer = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    const em = orm.em;

    DI.orm = orm;
    DI.em = em;
    DI.articleRepository = em.getRepository(Article);
    DI.listRepository = em.getRepository(List);

    // app.use('/trips', tripRouter);
    // app.use('/destinations', destinationRouter);


    app.listen(PORT, () => {
        console.log(`Server running http://localhost:${PORT}`);
    });
};

initializeServer().catch((err) => {
    console.error(err);
});