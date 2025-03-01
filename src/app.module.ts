import { Module } from '@nestjs/common';
import { JobOffersModule } from './job-offers/job-offers.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { JobOffer } from './job-offers/job-offer.entity';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigurationModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get('database.database'),
        entities: [JobOffer],
        synchronize: configService.get('database.synchronize'),
        migrationsRun: configService.get('database.migrationsRun'),
        logging: configService.get('database.logging'),
      }),
      inject: [ConfigService],
    }),
    JobOffersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
