import { Router } from 'express';
import { DI } from '../';
import { List } from '../entities/list'; // Import DestinationDTO
import { Article } from '../entities/article';

const router = Router({ mergeParams: true });



export const listRouter = router