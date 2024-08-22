import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  isString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import BoardEntity from 'src/entities/board.entity';
import UsersEntity from 'src/entities/users.entity';

export class PageDTO {
  @ApiProperty({ default: 10 })
  @IsNumber()
  max: number = 10;

  @ApiProperty({ default: 1 })
  @IsNumber()
  page: number = 1;
}
