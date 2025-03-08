import { Article } from "./article.tsx";

export interface List {
    id: string;
    name: string;
    description: string;
    create_date: Date;
    update_date: Date;
    favorite: boolean;
    articles?: Article[];
}