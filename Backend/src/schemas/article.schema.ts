import * as Yup from 'yup';


export const ArticleSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    image: Yup.string(),
    amount: Yup.number().required(),
    bought: Yup.boolean().default(false),
});