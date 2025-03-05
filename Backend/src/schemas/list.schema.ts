import * as Yup from 'yup';
import  { ArticleSchema } from "./article.schema";


export const ListSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    create_date: Yup.date(),
    update_date: Yup.date(),
    favorite: Yup.boolean(),
    articles: Yup.array().of(ArticleSchema)
});