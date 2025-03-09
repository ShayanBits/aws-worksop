import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })  // ✅ Allow NULL values for phone
  phone?: string;
}