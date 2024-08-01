import { Repository } from 'typeorm';
import ChattingEntity from 'src/entities/chatting.entity';
import ChatroomEntity from 'src/entities/chatroom.entity';
import UsersEntity from 'src/entities/users.entity';
export declare class ChatService {
    private readonly chattingRepository;
    private readonly chatroomRepository;
    private readonly userRepository;
    constructor(chattingRepository: Repository<ChattingEntity>, chatroomRepository: Repository<ChatroomEntity>, userRepository: Repository<UsersEntity>);
    createMessage(userId: string, chatroomId: string, message: string): Promise<ChattingEntity>;
}
