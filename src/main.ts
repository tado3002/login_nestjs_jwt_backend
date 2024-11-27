import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  };
  app.enableCors(cors);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
