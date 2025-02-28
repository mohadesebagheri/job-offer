import { Controller, Get } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOfferService: JobOffersService) {}

  @Get()
  async getHello() {
    return await this.jobOfferService.fetchJobOffers();
  }
}
