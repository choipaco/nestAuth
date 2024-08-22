"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT) || 8000,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,
    TYPEORM_SYBCHRONIZE: process.env.MODE === "DEV" ? true : false,
    MODE: process.env.MODE,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    JWT_ACCESS_EXPIRATION_TIME: process.env.JWT_ACCESS_EXPIRATION_TIME,
    JWT_REFRESH_EXPIRATION_TIME: process.env.JWT_REFRESH_EXPIRATION_TIME
});
//# sourceMappingURL=configuration.js.map