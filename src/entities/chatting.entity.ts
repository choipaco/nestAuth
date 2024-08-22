import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ChatroomEntity from './chatroom.entity';
import UsersEntity from './users.entity';

@Entity({ name: 'messages' })
export default class ChattingEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @ManyToOne(() => ChatroomEntity, (chatroom) => chatroom.messages)
  chatroom: ChatroomEntity;

  @ManyToOne(() => UsersEntity, (user) => user.messages)
  sender: UsersEntity;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;
}
