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
const typeorm_1 = require("typeorm");
const board_entity_1 = require("./board.entity");
let UsersEntity = class UsersEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'uuid' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id', type: 'varchar', length: 40, nullable: false, unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 40, nullable: false, unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 5, nullable: false, }),
    __metadata("design:type", String)
], UsersEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'text', nullable: false }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_entity_1.default, board => board.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "board", void 0);
UsersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UsersEntity);
exports.default = UsersEntity;
//# sourceMappingURL=users.entity.js.map