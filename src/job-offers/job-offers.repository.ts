import { Repository } from 'typeorm';
import { JobOffer } from './job-offer.entity';
import NotFoundError from '../exceptions/not-found.exception';
import DatabaseError from '../exceptions/database.exception';
import { Logger } from '@nestjs/common';
import { JobDTO } from './dto/job-offer.dto';

export interface JobOfferRepository extends Repository<JobOffer> {
  this: Repository<JobOffer>;
  getJobOffers(title, salaryMin, salaryMax): Promise<JobOffer[]>;
  getJobOffer(id: number): Promise<JobOffer>;
  createJobOffer(data: JobDTO): Promise<JobOffer>;
  getJobOfferById(jobId: string): Promise<JobOffer | null>;
}

export const customJobOfferRepositoryMethods: Pick<JobOfferRepository, any> = {
  async getJobOffer(id: number): Promise<JobOffer> {
    try {
      return await this.findOneBy({ id });
    } catch (error) {
      throw new NotFoundError('JobOffer', id);
    }
  },

  async getJobOfferById(jobId: string): Promise<JobOffer | null> {
    try {
      return await this.findOneBy({ jobId });
    } catch (error) {
      throw new NotFoundError('JobOffer', jobId);
    }
  },

  async getJobOffers(title, salaryMin, salaryMax): Promise<JobOffer[]> {
    try {
      const queryBuilder =
        this.createQueryBuilder('job-offer');

      if (title) {
        queryBuilder.andWhere('job-offer.title LIKE :title', {
          title: `%${title}%`,
        });
      }
      if (salaryMin) {
        queryBuilder.andWhere('job-offer.salaryMin >= :salaryMin', {
          salaryMin: salaryMin,
        });
      }
      if (salaryMax) {
        queryBuilder.andWhere('job-offer.salaryMax <= :salaryMax', {
          salaryMax: salaryMax,
        });
      }
      return await queryBuilder.getMany();
    } catch (error) {
      throw new DatabaseError([error.message]);
    }
  },

  async createJobOffer(data: JobDTO): Promise<JobOffer> {
    try {
      const jobOffer = this.create(data);
      return await this.save(jobOffer);
    } catch (error) {
      throw new DatabaseError([error.message]);
    }
  },
};
