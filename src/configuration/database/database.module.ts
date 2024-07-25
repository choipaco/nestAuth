import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('DATABASE_HOST'),
            port: configService.get('DATABASE_PORT'), 
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_SCHEMA'),
            synchronize: configService.get('TYPEORM_SYBCHRONIZE'),
            logging: true,
            entities: ["dist/**/*.entity.{ts,js}"]
          })
        })
    ]
})

export class DatabaseModule {}