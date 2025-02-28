import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobOffersService } from './job-offers.service';

@Injectable()
export class JobOfferTask {
  private readonly logger = new Logger(JobOfferTask.name);

  constructor(private readonly jobOfferService: JobOffersService) {}

  @Cron(process.env.CRON_SCHEDULE || CronExpression.EVERY_MINUTE)
  async fetchJobData() {
    this.logger.log('Fetching job data from APIs...');
    try {
      const transformedJobs = await this.jobOfferService.fetchJobOffers();
      this.logger.log(`Successfully retrieved ${transformedJobs.length} jobs!`);
    } catch (error) {
      this.logger.error('Error fetching or transforming job data', error);
    }
  }
}
