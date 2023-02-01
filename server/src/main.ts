import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import {AppModule} from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000'
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();