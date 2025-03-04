"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const list_1 = require("./list");
let Article = class Article {
    constructor({ name, description, image, amount, bought }) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.description = description;
        this.image = image;
        this.amount = amount;
        this.bought = bought;
    }
};
exports.Article = Article;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Article.prototype, "id", void 0);
__decorate([
    (0, core_1.Unique)(),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Article.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Article.prototype, "image", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Article.prototype, "amount", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Article.prototype, "bought", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => list_1.List, { nullable: true }),
    __metadata("design:type", list_1.List)
], Article.prototype, "list", void 0);
exports.Article = Article = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Article);
