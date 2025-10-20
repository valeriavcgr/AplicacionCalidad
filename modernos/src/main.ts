import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist:true, transform: true}));
  
  app.setBaseViewsDir(join(process.cwd(),'views'));
  app.setViewEngine('hbs');

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`App running on http://localhost:${port}`)

}
bootstrap();
//crea el proyecto
