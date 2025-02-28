import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import HttpExceptionFilter from './exceptions/filters/http-exception-filter';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = configService.get('app.port', 3000);
  await app.listen(port);
  console.log(`This application is runnning on: ${await app.getUrl()}`);
}
bootstrap();
