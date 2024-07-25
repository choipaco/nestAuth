import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UsersEntity from 'src/entities/users.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UsersEntity => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);