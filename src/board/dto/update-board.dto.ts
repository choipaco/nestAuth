import { IsEmail, isString, IsString, MaxLength, MinLength } from 'class-validator';
import BoardEntity from 'src/entities/board.entity';
import UsersEntity from 'src/entities/users.entity';

export class UpdateBoardDTO {

    @IsString()
    title: string;
    
    @IsString()
    content: string;


    toEntity():BoardEntity {
        const board = new BoardEntity()
        board.title = this.title;
        board.content = this.content;

        return board;
    }
}
