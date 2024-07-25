import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UsersEntity from "./users.entity";

@Entity({ name: 'board' })
export default class BoardEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'title', type: 'varchar', length: 120, nullable: false})
  title: string;

  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @CreateDateColumn({type: "timestamp", name: 'createdAt'})
  createdAt: Date

  @ManyToOne(() => UsersEntity, user => user.board, {onDelete: 'CASCADE'})
  user: UsersEntity;

}
