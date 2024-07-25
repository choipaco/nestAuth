import { MailService } from './mail.service';
import { MailDTO } from './dto/mail.dto';
import { MailChkDTO } from './dto/mailChk.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendCode(email: MailDTO): Promise<boolean>;
    codeChk(mailChk: MailChkDTO): Promise<boolean>;
}
