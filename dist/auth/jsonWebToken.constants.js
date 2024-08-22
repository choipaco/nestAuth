"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
const config_1 = require("@nestjs/config");
exports.jwtConstants = {
    secret: new config_1.ConfigService().get('SECRET_TOKEN'),
    expiresIn: new config_1.ConfigService().get('JWT_ACCESS_EXPIRATION_TIME')
};
//# sourceMappingURL=jsonWebToken.constants.js.map