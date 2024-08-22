import UsersEntity from 'src/entities/users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UsersEntity>);
    findByFields(options: FindOneOptions<LoginDTO | UsersEntity>): Promise<UsersEntity | undefined>;
    save(registerDTO: RegisterDTO): Promise<RegisterDTO & UsersEntity>;
    transformPassword(user: RegisterDTO): Promise<void>;
    getUserIfRefreshTokenMatches(refreshToken: string, userId: string): Promise<UsersEntity>;
}
