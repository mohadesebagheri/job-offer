import { Repository } from "typeorm";
import { JobOffer } from "./job-offer.entity"
import NotFoundError from "../exceptions/not-found.exception";
import DatabaseError from "../exceptions/database.exception";
import { Logger } from "@nestjs/common";

export interface JobOfferRepository extends Repository<JobOffer> {
  this: Repository<JobOffer>;
  getJobOffers(): Promise<JobOffer[]>;
  getJobOffer(id: number): Promise<JobOffer>;
}

export const customJobOfferRepositoryMethods: Pick<JobOfferRepository, any> = {

  async getJobOffer(id: number): Promise<JobOffer> {
    try {
      return await this.findOneBy({id})      
    } catch (error) {
      throw new NotFoundError('JobOffer', id)
    }
  },

  async getJobOffers(): Promise<JobOffer[]> {
    try {
      return await this.find()      
    } catch (error) {
      throw new DatabaseError([error.message])
    }
  },
};
