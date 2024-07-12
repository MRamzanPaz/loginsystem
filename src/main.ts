import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieSession({
      name: 'session',
      keys: ['sdfsdfsdfwtg'], // Replace with your secret key
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
  );
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
