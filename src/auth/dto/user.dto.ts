import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  id: string;

  @ApiProperty()
  @IsString()
  password: string;
}
