import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Response } from 'express';
import UsersEntity from 'src/entities/users.entity';
import { RefreshTokenDto } from './dto/refreshToken.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDTO: RegisterDTO): Promise<true | import("@nestjs/common").BadRequestException>;
    login(loginDTO: LoginDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<any>;
    infoMe(user: UsersEntity): Promise<UsersEntity>;
    info(uuid: string): Promise<UsersEntity>;
}
