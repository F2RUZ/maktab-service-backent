import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Morgan HTTP request logger
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream: {
        write: (message: string) => {
          logger.log(message.trim());
        },
      },
    }),
  );

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS sozlamalari
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Maktab Backend API')
    .setDescription(
      'Maktab veb-sayti uchun backend API - NestJS + PostgreSQL + Prisma\n\n' +
        '## Modullar:\n' +
        '- **Auth**: Login/Register va JWT authentication\n' +
        '- **News**: Yangiliklar (3 tilda: uz, ru, en)\n' +
        '- **Teachers**: O\'qituvchilar ma\'lumotlari\n' +
        '- **Gallery**: Foto, video va 360° virtual tur\n' +
        '- **Achievements**: Yutuqlar va mukofotlar\n' +
        '- **Admissions**: Qabul arizalari\n' +
        '- **Events**: Tadbirlar kalendari\n' +
        '- **Settings**: Sayt sozlamalari',
    )
    .setVersion('1.0.0')
    .addTag('Auth', 'Authentication va avtorizatsiya')
    .addTag('News', 'Yangiliklar boshqaruvi')
    .addTag('Teachers', 'O\'qituvchilar boshqaruvi')
    .addTag('Gallery', 'Galereya boshqaruvi')
    .addTag('Achievements', 'Yutuqlar boshqaruvi')
    .addTag('Admissions', 'Qabul arizalari')
    .addTag('Events', 'Tadbirlar')
    .addTag('Settings', 'Sozlamalar')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT token ni kiriting (login qilgandan keyin olasiz)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Maktab API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Server ishga tushdi: http://localhost:${port}`);
  logger.log(`📚 API dokumentatsiya: http://localhost:${port}/api`);
  logger.log(`📖 Swagger UI: http://localhost:${port}/docs`);
  logger.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'Connected ✅' : 'Not configured ❌'}`);
  logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
