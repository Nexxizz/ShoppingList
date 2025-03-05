import {Request, Response, Router} from 'express';
import { DI } from '../';
import { List } from '../entities/list';
import { Article } from '../entities/article';
import { ListSchema} from "../schemas/list.schema";

class ListController {
    router: Router;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.router.post('/createList', this.createListHandler);
        this.router.get('/getLists', this.getAllListsHandler);
        this.router.delete('/deleteList/:id', this.deleteListHandler);
        this.router.put('/updateList/:id', this.updateListHandler);
        this.router.get('/showArticleInList/:listId', this.showArticleInListHandler)
    }

    private createListHandler = (req: Request, res: Response): void => {
        this.createList(req, res);
    };

    private getAllListsHandler = (req: Request, res: Response): void => {
        this.getAllLists(req, res);
    };

    private deleteListHandler = (req: Request, res: Response): void => {
        this.deleteList(req, res);
    };

    private updateListHandler = (req: Request, res: Response): void => {
        this.updateList(req, res);
    };

    private showArticleInListHandler = (req: Request, res: Response): void => {
        this.showArticleInList(req, res);
    };

    showArticleInList= async (req: Request, res: Response): Promise<void> => {
        const em = DI.orm.em.fork();
        try {
            const articlesInList = await em.find(Article, {list: req.params.listId}, {populate: ["list"]});
            res.status(200).json(articlesInList);

        } catch (err) {
            res.status(400).send(err);
        }
    }

    updateList= async (req: Request, res: Response): Promise<void> => {
        const em = DI.orm.em.fork();
        try {
            await ListSchema.validate(req.body);
            const list = await em.findOne(List, { id: req.params.id });
            if (!list) {
                res.status(404).json({ error: 'Article not found'});
                return;
            }
            list.update_date = new Date(Date.now());

            em.assign(list, req.body);
            await em.persistAndFlush(list);
            res.status(200).json(list);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    deleteList= async (req: Request, res: Response): Promise<void> => {
        const em = DI.orm.em.fork();
        try{
            const list  = await em.findOne(List, { id: req.params.id });
            if (!list) {
                res.status(404).json({ error: 'Article not found' });
                return;
            }
            await em.removeAndFlush(list);
            res.status(200).json(list);
        } catch (err) {
            res.status(400).send(err);
        }

    }

    getAllLists = async (req: Request, res: Response) => {
        const em = DI.orm.em.fork();
        try {
            const lists = await em.findAll(List);
            res.status(200).send(lists);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    createList = async (req: Request, res: Response) => {
        const em = DI.orm.em.fork();
        try {
            await ListSchema.validate(req.body);
            const list = new List(req.body);
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
        } catch (error: any) {
            return res.status(400).json({ error: error.errors || error.message || 'Unknown error' });
        }
    };
}

const listController = new ListController();
export const listRouter = listController.router;