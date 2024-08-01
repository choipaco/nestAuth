import UsersEntity from "./users.entity";
import ChattingEntity from "./chatting.entity";
export default class ChatroomEntity {
    uuid: string;
    user1: UsersEntity;
    user2: UsersEntity;
    messages: ChattingEntity[];
    createdAt: Date;
}
