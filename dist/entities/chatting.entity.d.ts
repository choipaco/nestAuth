import ChatroomEntity from "./chatroom.entity";
import UsersEntity from "./users.entity";
export default class ChattingEntity {
    uuid: string;
    chatroom: ChatroomEntity;
    sender: UsersEntity;
    message: string;
    createdAt: Date;
}
