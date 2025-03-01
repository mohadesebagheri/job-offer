import { Module } from '@nestjs/common';
import { JobOffersController } from './job-offers.controller';
import { JobOffersService } from './job-offers.service';
import { UtilsService } from 'src/utils/utils.service';
import { JobOfferTask } from './job-offers.task';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { JobOffer } from './job-offer.entity';
import { getDataSourceToken, getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { customJobOfferRepositoryMethods } from './job-offers.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [ConfigurationModule, TypeOrmModule.forFeature([JobOffer])],
  controllers: [JobOffersController],
  providers: [
    JobOffersService,
    UtilsService,
    JobOfferTask,
    {
      provide: getRepositoryToken(JobOffer),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource
          .getRepository(JobOffer)
          .extend(customJobOfferRepositoryMethods);
      },
    },
  ],
})
export class JobOffersModule {}
