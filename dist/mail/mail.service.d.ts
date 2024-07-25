import { MailerService } from '@nestjs-modules/mailer';
import { MailDTO } from './dto/mail.dto';
import { Cache } from 'cache-manager';
import { MailChkDTO } from './dto/mailChk.dto';
export declare class MailService {
    private readonly mailerService;
    private readonly cacheService;
    constructor(mailerService: MailerService, cacheService: Cache);
    sendCode(emailDto: MailDTO): Promise<boolean>;
    codeChk(mailChk: MailChkDTO): Promise<boolean>;
}
