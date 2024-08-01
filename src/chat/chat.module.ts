import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChattingEntity from 'src/entities/chatting.entity';
import ChatroomEntity from 'src/entities/chatroom.entity';
import UsersEntity from 'src/entities/users.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ChattingEntity,ChatroomEntity,UsersEntity]),
  ],
  controllers: [ChatController],
  providers: [ChatService,ChatGateway]
})
export class ChatModule {}
