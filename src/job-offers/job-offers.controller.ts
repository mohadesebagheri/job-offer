import { Controller, Get, Query } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JobOffer } from './job-offer.entity';
import { JobDTO } from './dto/job-offer.dto';
import { JobOfferResponseDTO } from './dto/job-offer-response.dto';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOfferService: JobOffersService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of job offers' })
  @ApiResponse({
    status: 200,
    description: 'List of job offers',
    type: [JobOfferResponseDTO],
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'job title',
    type: String,
  })
  @ApiQuery({
    name: 'salaryMin',
    required: false,
    description: 'minimum salary',
    type: Number,
  })
  @ApiQuery({
    name: 'salaryMax',
    required: false,
    description: 'maximum salary',
    type: Number,
  })
  async getOffers(
    @Query('title') title?: string,
    @Query('salaryMin') salaryMin?: number,
    @Query('salaryMax') salaryMax?: number,
  ) {
    return await this.jobOfferService.getJobOffers(title, salaryMin, salaryMax);
  }
}
