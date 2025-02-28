export class JobDTO {
    jobId: string;
    title: string;
    location: string;
    remote: boolean;
    salaryMin: number;
    salaryMax: number;
    currency: string;
    company: string;
    website?: string;
    industry?: string;
    experience?: number;
    technologies: string[];
    postedDate: string;
  }