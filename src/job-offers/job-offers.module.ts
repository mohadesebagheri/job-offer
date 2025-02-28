import { Module } from '@nestjs/common';
import { JobOffersController } from './job-offers.controller';
import { JobOffersService } from './job-offers.service';
import { UtilsService } from 'src/utils/utils.service';
import { JobOfferTask } from './job-offers.task';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { JobOffer } from './job-offer.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [ConfigurationModule, TypeOrmModule.forFeature([JobOffer])],
  controllers: [JobOffersController],
  providers: [JobOffersService, UtilsService, JobOfferTask],
})
export class JobOffersModule {}
