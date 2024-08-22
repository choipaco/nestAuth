import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import UsersEntity from 'src/entities/users.entity';

export class RegisterDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  name: string;

  @ApiProperty()
  @IsString()
  password: string;

  toEntity(): UsersEntity {
    const users = new UsersEntity();
    users.id = this.id;
    users.email = this.email;
    users.name = this.name;
    users.password = this.password;

    return users;
  }
}
