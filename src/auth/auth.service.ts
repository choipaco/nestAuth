import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import UsersEntity from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './security/payload';
import { UserService } from './user.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @Inject(CACHE_MANAGER)
        private readonly cacheService:Cache,
        private readonly jwtService: JwtService
    ){}


    async Register(registerDTO: RegisterDTO){
        const mailChk = await this.cacheService.get(registerDTO.email);
        if(!mailChk){
            return new BadRequestException('이메일인증을 먼저 해주세요');
        }
        
        this.cacheService.del(registerDTO.email);

        await this.userService.save(registerDTO);

        return true;
    }
    

    async Login(loginDTO: LoginDTO){
        const user = loginDTO.toEntity();
        
        const userExist = await this.userService.findByFields({
            where:{
                id: user.id
            }
        })
        
        const passwordChk = await bcrypt.compare(user.password,userExist.password);
        if(!userExist || !passwordChk) throw new UnauthorizedException('아이디나 비밀번호를 다시 입력해주세요');

        const payload: Payload = {uuid: userExist.uuid, id: userExist.id};

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async tokenValidateUser(payload: Payload) {

        return await this.userService.findByFields({
          where: { uuid: payload.uuid }
        })
    }

    async info(uuid: string){
        const user = await this.userService.findByFields({
            where: { uuid }
        })
        user.password = undefined;
        return user;
    }

    async infoMe(user: UsersEntity){
        user.password = undefined;
        return user;
    }
}
