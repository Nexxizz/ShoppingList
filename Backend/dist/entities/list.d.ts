import { Collection } from '@mikro-orm/core';
import { Article, ArticleDTO } from "./article";
export declare class List {
    id: string;
    name: string;
    description: string;
    create_date: Date;
    update_date: Date;
    favorite: boolean;
    articles: Collection<Article, object>;
    constructor({ name, description, create_date, update_date, favorite }: ListDTO);
}
export type ListDTO = {
    name: string;
    description: string;
    create_date: Date;
    update_date: Date;
    favorite: boolean;
    articles?: ArticleDTO[];
};
