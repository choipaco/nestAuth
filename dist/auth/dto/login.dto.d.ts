import UsersEntity from 'src/entities/users.entity';
export declare class LoginDTO {
    id: string;
    password: string;
    toEntity(): UsersEntity;
}
