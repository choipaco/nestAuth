import BoardEntity from "./board.entity";
import ChatroomEntity from "./chatroom.entity";
import ChattingEntity from "./chatting.entity";
export default class UsersEntity {
    uuid: string;
    id: string;
    email: string;
    name: string;
    password: string;
    board: BoardEntity[];
    chatrooms: ChatroomEntity[];
    chatrooms2: ChatroomEntity[];
    messages: ChattingEntity[];
}
