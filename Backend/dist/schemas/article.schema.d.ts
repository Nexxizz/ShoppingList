import * as Yup from 'yup';
export declare const ArticleSchema: Yup.ObjectSchema<{
    name: string;
    description: string;
    image: string | undefined;
    amount: number;
    bought: boolean;
}, Yup.AnyObject, {
    name: undefined;
    description: undefined;
    image: undefined;
    amount: undefined;
    bought: false;
}, "">;
