import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UsersEntity from './users.entity';
import ChattingEntity from './chatting.entity';
@Entity({ name: 'chatroom' })
export default class ChatroomEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @ManyToOne(() => UsersEntity, (user) => user.chatrooms)
  user1: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.chatrooms)
  user2: UsersEntity;

  @OneToMany(() => ChattingEntity, (message) => message.chatroom)
  messages: ChattingEntity[];

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;
}
