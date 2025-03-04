import { List } from "./list";
export declare class Article {
    id: string;
    name: string;
    description: string;
    image: string;
    amount: number;
    bought: boolean;
    list?: List;
    constructor({ name, description, image, amount, bought }: ArticleDTO);
}
export type ArticleDTO = {
    name: string;
    description: string;
    image: string;
    amount: number;
    bought: boolean;
};
