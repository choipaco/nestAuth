import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jsonWebToken.constants';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CacheModule.register({
      store: 'memory',
      ttl: 30
    }),
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
          expiresIn: '3h'
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService,JwtStrategy]
})
export class AuthModule {}
