import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import HttpExceptionFilter from './exceptions/filters/http-exception-filter';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  const port = configService.get('app.port', 3000);
  const config = new DocumentBuilder()
    .setTitle('Job Offers API')
    .setDescription('The job offers API')
    .setVersion('1.0')
    .addGlobalParameters()
    .addTag('job-offers')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
  await app.listen(port);
  console.log(`This application is running on: ${await app.getUrl()}`);
}
bootstrap();
