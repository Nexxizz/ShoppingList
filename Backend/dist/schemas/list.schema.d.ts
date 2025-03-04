import * as Yup from 'yup';
export declare const ListSchema: Yup.ObjectSchema<{
    name: string;
    description: string;
    create_date: Date;
    update_date: Date;
    favorite: boolean | undefined;
    articles: {
        image?: string | undefined;
        name: string;
        description: string;
        amount: number;
        bought: boolean;
    }[] | undefined;
}, Yup.AnyObject, {
    name: undefined;
    description: undefined;
    create_date: undefined;
    update_date: undefined;
    favorite: undefined;
    articles: "";
}, "">;
