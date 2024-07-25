"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
const config_1 = require("@nestjs/config");
exports.jwtConstants = {
    secret: new config_1.ConfigService().get('SECRET_TOKEN'),
};
//# sourceMappingURL=jsonWebToken.constants.js.map