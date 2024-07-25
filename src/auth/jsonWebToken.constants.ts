import { ConfigService } from "@nestjs/config";

export const jwtConstants = {
    secret: new ConfigService().get('SECRET_TOKEN'),
  };
  