import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle("title")
    .setDescription("version. 1")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  app.useWebSocketAdapter(new IoAdapter(app));
  SwaggerModule.setup('/api-docs', app, document);
  app.enableCors();

  await app.listen(3000);
}

bootstrap();