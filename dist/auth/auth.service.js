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
exports.AuthService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user.service");
let AuthService = class AuthService {
    constructor(userService, cacheService, jwtService) {
        this.userService = userService;
        this.cacheService = cacheService;
        this.jwtService = jwtService;
    }
    async Register(registerDTO) {
        const mailChk = await this.cacheService.get(registerDTO.email);
        if (!mailChk) {
            return new common_1.BadRequestException('이메일인증을 먼저 해주세요');
        }
        this.cacheService.del(registerDTO.email);
        await this.userService.save(registerDTO);
        return true;
    }
    async Login(loginDTO) {
        const user = loginDTO.toEntity();
        const userExist = await this.userService.findByFields({
            where: {
                id: user.id
            }
        });
        const passwordChk = await bcrypt.compare(user.password, userExist.password);
        if (!userExist || !passwordChk)
            throw new common_1.UnauthorizedException('아이디나 비밀번호를 다시 입력해주세요');
        const payload = { uuid: userExist.uuid, id: userExist.id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
    async tokenValidateUser(payload) {
        return await this.userService.findByFields({
            where: { uuid: payload.uuid }
        });
    }
    async info(uuid) {
        const user = await this.userService.findByFields({
            where: { uuid }
        });
        user.password = undefined;
        return user;
    }
    async infoMe(user) {
        user.password = undefined;
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_service_1.UserService, Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map