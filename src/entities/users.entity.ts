import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BoardEntity from "./board.entity";
import ChatroomEntity from "./chatroom.entity";
import ChattingEntity from "./chatting.entity";
@Entity({ name: 'users' })
export default class UsersEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'id', type: 'varchar', length: 40, nullable: false, unique: true })
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 40, nullable: false, unique: true })
  email: string;

  @Column({name: 'name', type: 'varchar', length: 5, nullable: false, })
  name: string

  @Column({ name: 'password', type: 'text', nullable: false }) 
  password: string;

  @OneToMany(() =>  BoardEntity, board => board.user)
  board: BoardEntity[]

  @OneToMany(() => ChatroomEntity, (chatroom) => chatroom.user1)
  chatrooms: ChatroomEntity[];

  @OneToMany(() => ChatroomEntity, (chatroom) => chatroom.user2)
  chatrooms2: ChatroomEntity[];

  @OneToMany(() => ChattingEntity, (message) => message.sender)
  messages: ChattingEntity[];
}