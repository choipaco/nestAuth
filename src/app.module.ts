import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BoardModule } from './board/board.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    MailModule,
    BoardModule,
    ChatModule,
  ],
})
export class AppModule {}
