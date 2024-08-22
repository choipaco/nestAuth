import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Request, Response } from 'express';
import { GetUser } from './security/get-user.decorator';
import UsersEntity from 'src/entities/users.entity';
import { AuthGuard } from './security/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiBadRequestResponse({ description: '사용자가 입력을 잘못 한 경우' })
  @ApiOkResponse({ description: '성공한 경우', example: true })
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.Register(registerDTO);
  }

  @Post('/login')
  @ApiUnauthorizedResponse({
    description: '사용자가 입력을 잘못 한 경우',
    example: '아이디나 비밀번호를 다시 입력해주세요',
  })
  @ApiOkResponse({
    description: '성공한 경우',
    example: {
      accessToken: 'JWT token',
    },
  })
  async login(@Body() loginDTO: LoginDTO, @Res() res: Response) {
    const jwt = await this.authService.Login(loginDTO);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @Post('/refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto
  ) {
    return await this.authService.refresh(refreshTokenDto);
  }

  @Get('/@me')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: '성공한 경우',
    schema: {
      example: {
        uuid: 'uuid',
        id: 'id',
        email: 'email',
        name: 'name',
      },
    },
  })
  async infoMe(@GetUser() user: UsersEntity) {
    return this.authService.infoMe(user);
  }

  @Get('/:uuid')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      example: {
        uuid: 'uuid',
        id: 'id',
        email: 'email',
        name: 'name',
      },
    },
  })
  async info(@Param('uuid') uuid: string) {
    return this.authService.info(uuid);
  }
}
