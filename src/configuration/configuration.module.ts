import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './configuration';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
  ],
})
export class ConfigurationModule {}
