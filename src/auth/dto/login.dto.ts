import { IsString, MaxLength, MinLength } from 'class-validator';
import UsersEntity from 'src/entities/users.entity';

export class LoginDTO {

    @IsString()
    @MinLength(3)
    id: string;
    

    @IsString()
    password: string


    toEntity() {
        const users = new UsersEntity()
        users.id = this.id;
        users.password = this.password;

        return users;
    }
}
