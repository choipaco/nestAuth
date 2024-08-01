import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChattingEntity from 'src/entities/chatting.entity'; 
import ChatroomEntity from 'src/entities/chatroom.entity'; 
import UsersEntity from 'src/entities/users.entity'; 

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChattingEntity)
    private readonly chattingRepository: Repository<ChattingEntity>,
    @InjectRepository(ChatroomEntity)
    private readonly chatroomRepository: Repository<ChatroomEntity>,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async createMessage(userId: string, chatroomId: string, message: string): Promise<ChattingEntity> {
    const chatroom = await this.chatroomRepository.findOne({ where: { uuid: chatroomId } });
    const user = await this.userRepository.findOne({ where: { uuid: userId } });

    const chatMessage = new ChattingEntity();
    chatMessage.chatroom = chatroom;
    chatMessage.sender = user;
    chatMessage.message = message;

    return await this.chattingRepository.save(chatMessage);
  }
}
