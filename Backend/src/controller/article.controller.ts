import { Router, Request, Response } from 'express';
import { DI } from '../';
import { Article } from '../entities/article';
import { ArticleSchema} from "../schemas/article.schema";

class ArticleController {
    router: Router;

    constructor() {
        this.router = Router({ mergeParams: true });

        // Register routes with alternative syntax
        this.router.post('/createArticle', this.createArticleHandler);
    }

    // Use a different name for the handler to avoid confusion
    private createArticleHandler = (req: Request, res: Response): void => {
        this.createArticle(req, res);
    };

    // Keep your original implementation
    createArticle = async (req: Request, res: Response) => {
        const em = DI.orm.em.fork();
        try {
            await ArticleSchema.validate(req.body);
            const article = new Article(req.body);
            await em.persistAndFlush(article);
            res.status(201).json(article);
        } catch (error: any) {
            console.log("Validation error:", error);
            return res.status(400).json({ error: error.errors || error.message || 'Unknown error' });
        }
    };
}

// Create an instance and export the router
const articleController = new ArticleController();
export const articleRouter = articleController.router;