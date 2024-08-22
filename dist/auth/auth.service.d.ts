import { BadRequestException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import UsersEntity from 'src/entities/users.entity';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './security/payload';
import { UserService } from './user.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
export declare class AuthService {
    private userService;
    private readonly cacheService;
    private readonly jwtService;
    constructor(userService: UserService, cacheService: Cache, jwtService: JwtService);
    generateRefreshToken(user: UsersEntity): Promise<string>;
    generateAccessToken(user: UsersEntity): Promise<string>;
    Register(registerDTO: RegisterDTO): Promise<true | BadRequestException>;
    Login(loginDTO: LoginDTO): Promise<{
        accessToken: Promise<string>;
        refreshToken: Promise<string>;
    }>;
    tokenValidateUser(payload: Payload): Promise<UsersEntity>;
    info(uuid: string): Promise<UsersEntity>;
    infoMe(user: UsersEntity): Promise<UsersEntity>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
}
