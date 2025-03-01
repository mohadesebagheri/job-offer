import { ApiProperty } from '@nestjs/swagger';

export class JobOfferResponseDTO {
  @ApiProperty({
    example: 1,
    description: 'job offer identifier',
  })
  id: number;

  @ApiProperty({
    example: 'P1-997',
    description: 'Unique identifier for the job offer',
  })
  jobId: string;

  @ApiProperty({
    example: 'Backend Engineer',
    description: 'Title of the job offer',
  })
  title: string;

  @ApiProperty({ example: 'New York, NY', description: 'Location of the job' })
  location: string;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the job is remote',
  })
  remote: boolean;

  @ApiProperty({ example: 74, description: 'Minimum salary for the job offer' })
  salaryMin: number;

  @ApiProperty({
    example: 129,
    description: 'Maximum salary for the job offer',
  })
  salaryMax: number;

  @ApiProperty({ example: 'USD', description: 'Currency used for the salary' })
  currency: string;

  @ApiProperty({
    example: 'Creative Design Ltd',
    description: 'Company offering the job',
  })
  company: string;

  @ApiProperty({
    example: 'https://creative-design.com',
    description: 'Website of the company offering the job',
    nullable: true,
  })
  website?: string;

  @ApiProperty({
    example: 'Analytics',
    description: 'Industry the job belongs to',
    nullable: true,
  })
  industry?: string;

  @ApiProperty({
    example: 3,
    description: 'Experience required for the job in years',
    nullable: true,
  })
  experience?: number;

  @ApiProperty({
    example: ['Java', 'Spring Boot', 'AWS'],
    description: 'Technologies required for the job',
  })
  technologies: string[];

  @ApiProperty({
    example: '2025-02-20T20:56:31.014Z',
    description: 'Date when the job was posted',
  })
  postedDate: string;
}
