import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { MailDTO } from './dto/mail.dto';
import { randomSix } from 'src/utils/random';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MailChkDTO } from './dto/mailChk.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheService: Cache,
  ) {}

  async sendCode(emailDto: MailDTO) {
    const code = randomSix();
    const mail = emailDto.email;
    this.mailerService
      .sendMail({
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
        new ConflictException(err);
      });

    return true;
  }

  async codeChk(mailChk: MailChkDTO) {
    const storedCode = await this.cacheService.get(mailChk.email);
    if (storedCode && mailChk.code === storedCode) {
      await this.cacheService.del(mailChk.email);
      this.cacheService.set(mailChk.email, true, 1000 * 60 * 10);
      return true;
    }
    return false;
  }
}
