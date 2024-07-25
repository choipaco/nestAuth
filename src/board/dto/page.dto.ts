import { IsEmail, IsNumber, isString, IsString, MaxLength, MinLength } from 'class-validator';
import BoardEntity from 'src/entities/board.entity';
import UsersEntity from 'src/entities/users.entity';

export class PageDTO {

    @IsNumber()
    max: number = 10;
    
    @IsNumber()
    page: number = 1;
}
