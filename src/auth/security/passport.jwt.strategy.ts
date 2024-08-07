import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Payload } from "./payload";
import { jwtConstants } from "../jsonWebToken.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    })
  }
  
  async validate(payload: Payload, done: VerifiedCallback) {
    const user = await this.authService.tokenValidateUser(payload);
    if(!user) {
      return done(new UnauthorizedException({message: 'user does not exist'}), false)
    }
    return done(null, user);
  }
}