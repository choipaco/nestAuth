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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const board_service_1 = require("./board.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const auth_guard_1 = require("../auth/security/auth.guard");
const get_user_decorator_1 = require("../auth/security/get-user.decorator");
const users_entity_1 = require("../entities/users.entity");
const page_dto_1 = require("./dto/page.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const swagger_1 = require("@nestjs/swagger");
const page_response_dto_1 = require("./dto/page-response.dto");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    async create(createBoardDTO, user) {
        return this.boardService.create(createBoardDTO, user);
    }
    async list(query) {
        return this.boardService.list(query);
    }
    async getOne(uuid) {
        return this.boardService.getOne(uuid);
    }
    async update(uuid, updateBoardDTO, user) {
        return this.boardService.update(uuid, updateBoardDTO, user);
    }
    async delete(uuid, user) {
        return this.boardService.delete(uuid, user);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiBadRequestResponse)({ description: '입력이 틀렸을 경우' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공한 경우' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDTO, users_entity_1.default]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/list'),
    (0, swagger_1.ApiOkResponse)({ description: '성공한 경우', type: page_response_dto_1.PaginatedResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageDTO]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:uuid'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)('/update/:uuid'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_board_dto_1.UpdateBoardDTO, users_entity_1.default]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:uuid'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.default]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "delete", null);
exports.BoardController = BoardController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('board'),
    (0, common_1.Controller)('board'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
//# sourceMappingURL=board.controller.js.map