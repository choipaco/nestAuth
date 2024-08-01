import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    server: Socket;
    private users;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinChatroom(client: Socket, { chatroomId }: {
        chatroomId: string;
    }): Promise<void>;
    handleSendMessage(client: Socket, { chatroomId, message }: {
        chatroomId: string;
        message: string;
    }): Promise<void>;
}
