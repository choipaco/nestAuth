import { IsString, MaxLength, MinLength } from 'class-validator';
import UsersEntity from 'src/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  id: string;

  @ApiProperty()
  @IsString()
  password: string;

  toEntity() {
    const users = new UsersEntity();
    users.id = this.id;
    users.password = this.password;

    return users;
  }
}
