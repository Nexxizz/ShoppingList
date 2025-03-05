import { Router, Request, Response } from 'express';
import { DI } from '../';
import { Article } from '../entities/article';
import { ArticleSchema} from "../schemas/article.schema";

class ArticleController {
    router: Router;

    constructor() {
        this.router = Router({ mergeParams: true });

        this.router.post('/createArticle', this.createArticleHandler);
        this.router.get('/getArticles', this.getAllArticlesHandler);
    }

    private createArticleHandler = (req: Request, res: Response): void => {
        this.createArticle(req, res);
    };

    private getAllArticlesHandler = (req: Request, res: Response): void => {
        this.getAllArticles(req, res);
    };

    getAllArticles = async (req: Request, res: Response) => {
        const em = DI.orm.em.fork();
        try {
            const articles = await em.findAll(Article);
            res.status(200).send(articles);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    createArticle = async (req: Request, res: Response) => {
        const em = DI.orm.em.fork();
        try {
            await ArticleSchema.validate(req.body);
            const article = new Article(req.body);
            await em.persistAndFlush(article);
            res.status(201).json(article);
        } catch (error: any) {
            return res.status(400).json({ error: error.errors || error.message || 'Unknown error' });
        }
    };
}

const articleController = new ArticleController();
export const articleRouter = articleController.router;