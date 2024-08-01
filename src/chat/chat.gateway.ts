import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Socket;
  
  private users: Map<string, string> = new Map(); // clientId와 userId 매핑

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.uuid; // UUID 추출
    this.users.set(client.id, String(userId)); // 클라이언트 ID와 사용자 UUID 매핑
    console.log(`Client connected: ${client.id} with userId: ${userId}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id); // 연결 해제 시 사용자 정보 삭제
  }

  @SubscribeMessage('joinChatroom')
  async handleJoinChatroom(client: Socket, { chatroomId }: { chatroomId: string }) {
    const userId = this.users.get(client.id); // 클라이언트의 유저 ID 가져오기
    client.join(chatroomId);
    console.log(`${userId} joined chatroom: ${chatroomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, { chatroomId, message }: { chatroomId: string; message: string }) {
    const userId = this.users.get(client.id); // 현재 클라이언트의 유저 ID 가져오기
    const chatMessage = await this.chatService.createMessage(userId, chatroomId, message);
    this.server.to(chatroomId).emit('message', chatMessage);
  }
}
