import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity({ name: 'job-offer' })
export class JobOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  jobId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'boolean', default: false })
  remote: boolean;

  @Column({ type: 'int', nullable: true })
  salaryMin: number;

  @Column({ type: 'int', nullable: true })
  salaryMax: number;

  @Column({ type: 'varchar', default: 'USD' })
  currency: string;

  @Column({ type: 'varchar', length: 255 })
  company: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  industry?: string;

  @Column({ type: 'int', nullable: true })
  experience?: number;

  @Column('simple-array')
  technologies: string[];

  @CreateDateColumn({ type: 'timestamp' })
  postedDate: Date;
}
