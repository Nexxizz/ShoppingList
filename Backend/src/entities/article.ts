import { Entity, PrimaryKey, Property, ManyToOne, Collection, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { List} from "./list";

@Entity()
export class Article {
    @PrimaryKey()
    id: string = v4();

    @Unique()
    @Property()
    name!: string;

    @Property()
    description!: string;

    @Property()
    image!: string;

    @Property()
    amount!: number;

    @Property()
    bought!: boolean;

    @ManyToOne(() => List, { nullable: true })
    list?: List;

    constructor({ name, description, image, amount, bought }: ArticleDTO){
        this.name = name;
        this.description = description;
        this.image = image;
        this.amount = amount;
        this.bought = bought;
    }
}

export type ArticleDTO = {
    name: string;
    description: string;
    image: string;
    amount: number;
    bought: boolean;
};