import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserDTO {

    @IsString()
    @MinLength(3)
    id: string;
    

    @IsString()
    password: string

}
