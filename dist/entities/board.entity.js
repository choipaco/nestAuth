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
const users_entity_1 = require("./users.entity");
let BoardEntity = class BoardEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'uuid' }),
    __metadata("design:type", String)
], BoardEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: 120, nullable: false }),
    __metadata("design:type", String)
], BoardEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content', type: 'text', nullable: false }),
    __metadata("design:type", String)
], BoardEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", name: 'createdAt' }),
    __metadata("design:type", Date)
], BoardEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.default, user => user.board, { onDelete: 'CASCADE' }),
    __metadata("design:type", users_entity_1.default)
], BoardEntity.prototype, "user", void 0);
BoardEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'board' })
], BoardEntity);
exports.default = BoardEntity;
//# sourceMappingURL=board.entity.js.map