import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  console.log(`Server listening on http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
