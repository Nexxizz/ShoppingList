"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRouter = void 0;
const express_1 = require("express");
const __1 = require("../");
const article_1 = require("../entities/article");
const article_schema_1 = require("../schemas/article.schema");
const list_1 = require("../entities/list");
class ArticleController {
    constructor() {
        this.createArticleHandler = (req, res) => {
            this.createArticle(req, res);
        };
        this.getAllArticlesHandler = (req, res) => {
            this.getAllArticles(req, res);
        };
        this.deleteArticleHandler = (req, res) => {
            this.deleteArticle(req, res);
        };
        this.updateArticleHandler = (req, res) => {
            this.updateArticle(req, res);
        };
        this.addArticleToListHandler = (req, res) => {
            this.addArticleToList(req, res);
        };
        this.addArticleToList = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                const article = await em.findOne(article_1.Article, { id: req.params.articleId });
                if (!article) {
                    res.status(404).json({ error: 'Article not found' });
                    return;
                }
                const list = await em.findOne(list_1.List, { id: req.params.listId });
                if (!list) {
                    res.status(404).json({ error: 'List not found' });
                    return;
                }
                article.list = list;
                await em.persistAndFlush(article);
                res.status(200).json(article);
            }
            catch (err) {
                res.status(400).send(err);
            }
        };
        this.updateArticle = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                await article_schema_1.ArticleSchema.validate(req.body);
                const article = await em.findOne(article_1.Article, { id: req.params.id });
                if (!article) {
                    res.status(404).json({ error: 'Article not found' });
                    return;
                }
                em.assign(article, req.body);
                await em.persistAndFlush(article);
                res.status(200).json(article);
            }
            catch (err) {
                res.status(400).send(err);
            }
        };
        this.deleteArticle = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                const article = await em.findOne(article_1.Article, { id: req.params.id });
                if (!article) {
                    res.status(404).json({ error: 'Article not found' });
                    return;
                }
                await em.removeAndFlush(article);
                res.status(200).json(article);
            }
            catch (err) {
                res.status(400).send(err);
            }
        };
        this.getAllArticles = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                const articles = await em.findAll(article_1.Article);
                res.status(200).send(articles);
            }
            catch (err) {
                res.status(500).send(err);
            }
        };
        this.createArticle = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                await article_schema_1.ArticleSchema.validate(req.body);
                const article = new article_1.Article(req.body);
                await em.persistAndFlush(article);
                res.status(201).json(article);
            }
            catch (error) {
                return res.status(400).json({ error: error.errors || error.message || 'Unknown error' });
            }
        };
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.router.post('/createArticle', this.createArticleHandler);
        this.router.get('/getArticles', this.getAllArticlesHandler);
        this.router.delete('/deleteArticle/:id', this.deleteArticleHandler);
        this.router.put('/updateArticle/:id', this.updateArticleHandler);
        this.router.put('/addArticleToList/:listId/:articleId', this.addArticleToListHandler);
    }
}
const articleController = new ArticleController();
exports.articleRouter = articleController.router;
