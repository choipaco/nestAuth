import { Body, Controller, Post, Get, Param, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Request, Response } from 'express';
import { GetUser } from './security/get-user.decorator';
import UsersEntity from 'src/entities/users.entity';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() registerDTO: RegisterDTO){
        return this.authService.Register(registerDTO);
    }

    @Post('/login')
    async login(@Body() loginDTO: LoginDTO, @Res() res: Response ){
        const jwt = await this.authService.Login(loginDTO);
        res.setHeader('Authorization', 'Bearer '+ jwt.accessToken)

        return res.json(jwt);
        
    }

    @Get('/@me')
    @UseGuards(AuthGuard)
    async infoMe(@GetUser() user: UsersEntity){
        return this.authService.infoMe(user);
    }

    @Get('/:uuid')
    @UseGuards(AuthGuard)
    async info(@Param('uuid') uuid: string){
        return this.authService.info(uuid);
    }
}
