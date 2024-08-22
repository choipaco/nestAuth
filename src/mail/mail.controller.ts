import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDTO } from './dto/mail.dto';
import { MailChkDTO } from './dto/mailChk.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('mail')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('/sendCode')
    async sendCode(@Body() email:MailDTO){
        return this.mailService.sendCode(email);
    }

    @Post('/codeChk')
    async codeChk(@Body() mailChk:MailChkDTO){
        return this.mailService.codeChk(mailChk);
    }
}
