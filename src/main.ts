import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Validation pipe global
  app.useGlobalPipes(new ValidationPipe());

  // Global api endpoint prefix
  app.setGlobalPrefix('/v1');

  // Swagger setup
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Test')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('One')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
