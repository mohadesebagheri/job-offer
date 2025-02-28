import { Injectable } from '@nestjs/common';
import axios from 'axios';
import ProviderError from 'src/exceptions/provider.exception';
import { UtilsService } from 'src/utils/utils.service';
import { jobMappings } from './config/mapping';
import { JobDTO } from './dto/job-offer.dto';

@Injectable()
export class JobOffersService {
  constructor(private readonly utilsService: UtilsService) {}
  private axios = axios.create({
    baseURL: 'https://assignment.devotel.io/api',
  });
  public async fetchJobOffers() {
    const result: Array<JobDTO> = [];
    let provider1Result: object[] = [];
    let provider2Result: object[] = [];
    try {
      const result = await this.axios.get('/provider1/jobs');
      provider1Result = result?.data?.jobs;
    } catch (error) {
      throw new ProviderError([error.message], __filename);
    }

    provider1Result.forEach((item) => {
      const transformedData = this.utilsService.transformData<JobDTO>(
        item,
        jobMappings.provider1,
      );
      result.push(transformedData);
    });
    try {
      const result = await this.axios.get('/provider2/jobs');
      provider2Result = result?.data?.data?.jobsList;
    } catch (error) {
      throw new ProviderError([error.message], __filename);
    }

    Object.entries(provider2Result).map(([jobId, jobData]) => {
      const transformedData = this.utilsService.transformData<JobDTO>(jobData, jobMappings.provider2, jobId)
      result.push(transformedData);

    })

    return result;
  }
}
