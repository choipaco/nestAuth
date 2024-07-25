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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("../entities/board.entity");
const typeorm_2 = require("typeorm");
let BoardService = class BoardService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    async create(createBoardDTO, user) {
        const board = createBoardDTO.toEntity();
        board.user = user;
        await this.boardRepository.save(board);
    }
    async list(pageDTO) {
        const { max, page } = pageDTO;
        const skip = (page - 1) * max;
        const [items, total] = await this.boardRepository.findAndCount({
            skip,
            take: max,
            order: { createdAt: 'DESC' },
            relations: ['user']
        });
        const response = {
            items: items.map((item) => ({
                uuid: item.uuid,
                title: item.title,
                content: undefined,
                createdAt: item.createdAt,
                user: {
                    uuid: item.user.uuid,
                    id: item.user.id,
                },
            })),
            total,
            currentPage: page,
            totalPages: Math.ceil(total / max),
        };
        return response;
    }
    async getOne(uuid) {
        const info = await this.boardRepository.findOne({
            where: {
                uuid: uuid
            },
            relations: ['user'],
        });
        info.user = {
            ...info.user,
            password: undefined,
            name: undefined,
            email: undefined,
        };
        return info;
    }
    async update(uuid, updateBoardDTO, user) {
        const info = await this.boardRepository.findOne({
            where: {
                uuid: uuid
            },
            relations: ['user']
        });
        if (!info)
            new common_1.NotFoundException("게시판을 찾을 수 없습니다");
        if (info.user.uuid !== user.uuid)
            new common_1.UnauthorizedException("같은 유저가 아닙니다");
        const board = updateBoardDTO.toEntity();
        info.title = board.title;
        info.content = board.content;
        await this.boardRepository.save(info);
        return true;
    }
    async delete(uuid, user) {
        const info = await this.boardRepository.findOne({
            where: {
                uuid: uuid
            },
            relations: ['user']
        });
        if (!info)
            new common_1.NotFoundException("게시판을 찾을 수 없습니다");
        if (info.user.uuid !== user.uuid)
            new common_1.UnauthorizedException("같은 유저가 아닙니다");
        await this.boardRepository.remove(info);
        return true;
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardService);
//# sourceMappingURL=board.service.js.map