import UsersEntity from 'src/entities/users.entity';
export declare class RegisterDTO {
    id: string;
    email: string;
    name: string;
    password: string;
    toEntity(): UsersEntity;
}
