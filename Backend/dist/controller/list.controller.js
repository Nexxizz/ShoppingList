"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRouter = void 0;
const express_1 = require("express");
const __1 = require("../");
const list_1 = require("../entities/list");
const list_schema_1 = require("../schemas/list.schema");
class ListController {
    constructor() {
        this.createListHandler = (req, res) => {
            this.createList(req, res);
        };
        this.getAllListsHandler = (req, res) => {
            this.getAllLists(req, res);
        };
        this.deleteListHandler = (req, res) => {
            this.deleteList(req, res);
        };
        this.updateListHandler = (req, res) => {
            this.updateList(req, res);
        };
        this.showArticleInListHandler = (req, res) => {
            this.showArticleInList(req, res);
        };
        this.showAllListsWithArticleHandler = (req, res) => {
            this.showAllListsWithArticle(req, res);
        };
        this.showAllListsWithArticle = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                const listsWithArticles = await em.find(list_1.List, {}, { populate: ["articles"] });
                res.status(200).json(listsWithArticles);
            }
            catch (err) {
                res.status(400).send(err);
            }
        };
        this.showArticleInList = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                const listWithArticles = await em.findOne(list_1.List, req.params.listId, { populate: ["articles"] });
                res.status(200).json(listWithArticles);
            }
            catch (err) {
                res.status(400).send(err);
            }
        };
        this.updateList = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                await list_schema_1.ListSchema.validate(req.body);
                const list = await em.findOne(list_1.List, { id: req.params.id });
                if (!list) {
                    res.status(404).json({ error: 'Article not found' });
                    return;
                }
                list.update_date = new Date(Date.now());
                em.assign(list, req.body);
                await em.persistAndFlush(list);
                res.status(200).json(list);
            }
            catch (err) {
                res.status(400).send(err);
            }
        };
        this.deleteList = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                const list = await em.findOne(list_1.List, { id: req.params.id });
                if (!list) {
                    res.status(404).json({ error: 'Article not found' });
                    return;
                }
                await em.removeAndFlush(list);
                res.status(200).json(list);
            }
            catch (err) {
                res.status(400).send(err);
            }
        };
        this.getAllLists = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                const lists = await em.findAll(list_1.List);
                res.status(200).send(lists);
            }
            catch (err) {
                res.status(500).send(err);
            }
        };
        this.createList = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                await list_schema_1.ListSchema.validate(req.body);
                const list = new list_1.List(req.body);
                if (list.create_date == null) {
                    list.create_date = new Date(Date.now());
                }
                if (list.update_date == null) {
                    list.update_date = new Date(Date.now());
                }
                if (list.favorite == null) {
                    list.favorite = false;
                }
                await em.persistAndFlush(list);
                res.status(201).json(list);
            }
            catch (error) {
                return res.status(400).json({ error: error.errors || error.message || 'Unknown error' });
            }
        };
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.router.post('/createList', this.createListHandler);
        this.router.get('/getLists', this.getAllListsHandler);
        this.router.delete('/deleteList/:id', this.deleteListHandler);
        this.router.put('/updateList/:id', this.updateListHandler);
        this.router.get('/showArticleInList/:listId', this.showArticleInListHandler);
        this.router.get('/showAllListsWithArticle', this.showAllListsWithArticleHandler);
    }
}
const listController = new ListController();
exports.listRouter = listController.router;
