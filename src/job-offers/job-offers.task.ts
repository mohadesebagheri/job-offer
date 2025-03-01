import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobOffersService } from './job-offers.service';
import { JobOffer } from './job-offer.entity';
import { JobOfferRepository } from './job-offers.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobOfferTask {
  private readonly logger = new Logger(JobOfferTask.name);

  constructor(
    private readonly jobOfferService: JobOffersService,
    @InjectRepository(JobOffer)
    private readonly jobOfferRepository: JobOfferRepository,
  ) {}

  @Cron(process.env.CRON_SCHEDULE || CronExpression.EVERY_MINUTE)
  async fetchJobData() {
    this.logger.log('Fetching job data from APIs...');
    try {
      const transformedJobs = await this.jobOfferService.fetchJobOffers();
      this.logger.log(`Successfully retrieved ${transformedJobs.length} jobs!`);
      for(const offer of transformedJobs){
        const jobOffer = await this.jobOfferRepository.getJobOfferById(offer.jobId)
        if (jobOffer) continue
        await this.jobOfferRepository.createJobOffer(offer)
      }
    } catch (error) {
      this.logger.error('Error fetching or transforming job data', error);
    }
  }
}
