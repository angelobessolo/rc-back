import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filter-errors/all-exceptions-filter';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CASHUP RESTFULL API')
    .setDescription('DOCUMENTATION CASHUP ENDPOINTS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.use('/public', express.static(join(process.cwd(), 'public')));

  // Increase the util load
  app.use(bodyParser.json({ limit: '50mb' }));
  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // console.log(port);
}
bootstrap();
