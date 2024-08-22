import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import BoardEntity from 'src/entities/board.entity';
import UsersEntity from 'src/entities/users.entity';

export class CreateBoardDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  toEntity(): BoardEntity {
    const board = new BoardEntity();
    board.title = this.title;
    board.content = this.content;

    return board;
  }
}
