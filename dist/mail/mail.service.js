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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const random_1 = require("../utils/random");
const cache_manager_1 = require("@nestjs/cache-manager");
let MailService = class MailService {
    constructor(mailerService, cacheService) {
        this.mailerService = mailerService;
        this.cacheService = cacheService;
    }
    async sendCode(emailDto) {
        const code = (0, random_1.randomSix)();
        const mail = emailDto.email;
        this.mailerService.sendMail({
            to: mail,
            from: 'noreplay@gmail.com',
            subject: '인증코드가 도착했어요!',
            text: `${code}`,
            html: `<b>${code}</b>`,
        })
            .then((res) => {
            this.cacheService.set(mail, code, 1000 * 60 * 5);
        })
            .catch((err) => {
            new common_1.ConflictException(err);
        });
        return true;
    }
    async codeChk(mailChk) {
        const storedCode = await this.cacheService.get(mailChk.email);
        if (storedCode && mailChk.code === storedCode) {
            await this.cacheService.del(mailChk.email);
            this.cacheService.set(mailChk.email, true, 1000 * 60 * 10);
            return true;
        }
        return false;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mailer_1.MailerService, Object])
], MailService);
//# sourceMappingURL=mail.service.js.map