export const jobMappings = {
  provider1: {
    jobId: 'jobId',
    title: 'title',
    location: 'details.location',
    remote: () => false,
    salaryMin: (data: any) =>
      parseInt(data.details.salaryRange.split('-')[0].replace(/\D/g, '')),
    salaryMax: (data: any) =>
      parseInt(data.details.salaryRange.split('-')[1].replace(/\D/g, '')),
    currency: () => 'USD',
    company: 'company.name',
    industry: 'company.industry',
    website: () => null,
    experience: () => null,
    technologies: 'skills',
    postedDate: 'postedDate',
  },
  provider2: {
    jobId: (data: any, jobId: string) => jobId,
    title: 'position',
    location: ['location.city', 'location.state'],
    remote: 'location.remote',
    salaryMin: 'compensation.min',
    salaryMax: 'compensation.max',
    currency: 'compensation.currency',
    company: 'employer.companyName',
    website: 'employer.website',
    industry: () => null,
    experience: 'requirements.experience',
    technologies: 'requirements.technologies',
    postedDate: 'datePosted',
  },
};
