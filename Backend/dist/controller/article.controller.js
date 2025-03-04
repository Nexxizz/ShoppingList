"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRouter = void 0;
const express_1 = require("express");
const __1 = require("../");
const article_1 = require("../entities/article");
const article_schema_1 = require("../schemas/article.schema");
class ArticleController {
    constructor() {
        // Use a different name for the handler to avoid confusion
        this.createArticleHandler = (req, res) => {
            this.createArticle(req, res);
        };
        // Keep your original implementation
        this.createArticle = async (req, res) => {
            const em = __1.DI.orm.em.fork();
            try {
                await article_schema_1.ArticleSchema.validate(req.body);
                const article = new article_1.Article(req.body);
                await em.persistAndFlush(article);
                res.status(201).json(article);
            }
            catch (error) {
                console.log("Validation error:", error);
                return res.status(400).json({ error: error.errors || error.message || 'Unknown error' });
            }
        };
        this.router = (0, express_1.Router)({ mergeParams: true });
        // Register routes with alternative syntax
        this.router.post('/createArticle', this.createArticleHandler);
    }
}
// Create an instance and export the router
const articleController = new ArticleController();
exports.articleRouter = articleController.router;
