import {Entity, PrimaryKey, Property, Collection, Unique, OneToMany} from '@mikro-orm/core';
import { v4 } from 'uuid';
import {Article, ArticleDTO} from "./article";


@Entity()
export class List {
    @PrimaryKey()
    id: string = v4();

    @Unique()
    @Property()
    name!: string;

    @Property()
    description!: string;

    @Property()
    create_date!: Date;

    @Property()
    update_date!: Date;

    @Property({ nullable: true })
    favorite: boolean = false;

    @OneToMany(() => Article, article => article.list)
    articles = new Collection<Article>(this);

    constructor({ name, description, create_date, update_date, favorite}: ListDTO){
        this.name = name;
        this.description = description;
        this.create_date = create_date;
        this.update_date = update_date;
        this.favorite = favorite;
    }
}


export type ListDTO = {
    name: string;
    description: string;
    create_date: Date;
    update_date: Date;
    favorite: boolean;
    articles?: ArticleDTO[];
};