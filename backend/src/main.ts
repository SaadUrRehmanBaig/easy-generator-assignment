import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './common/env/env.service';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@common/interceptors/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const port = envService.get('PORT') || 3000;
  app.enableCors({
    origin: envService.get('FE_URL'),
    methods: envService.get('ALLOWED_METHODS'),
    credentials: true,
    allowedHeaders: envService.get('ALLOWED_HEADERS'),
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
