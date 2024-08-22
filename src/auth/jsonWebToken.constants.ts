import { ConfigService } from "@nestjs/config";

export const jwtConstants = {
    secret: new ConfigService().get('SECRET_TOKEN'),
    expiresIn: new ConfigService().get('JWT_ACCESS_EXPIRATION_TIME')
};
  