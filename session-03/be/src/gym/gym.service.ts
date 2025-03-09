import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
  ) {}

  findAll(): Promise<Gym[]> {
    return this.gymRepository.find();
  }
  findOne(id: number): Promise<Gym | null> {
    return this.gymRepository.findOneBy({ id });
  }

  create(gym: Partial<Gym>): Promise<Gym> {
    return this.gymRepository.save(gym);
  }

  async update(id: number, gym: Partial<Gym>): Promise<Gym> {
    await this.gymRepository.update(id, gym);
    const updatedGym = await this.gymRepository.findOneBy({ id });
    if (!updatedGym) {
      throw new Error(`Gym with ID ${id} not found`);
    }
    return updatedGym;
  }

  async delete(id: number): Promise<void> {
    const gym = await this.gymRepository.findOneBy({ id });
    if (!gym) {
      throw new Error(`Gym with ID ${id} not found`);
    }
    await this.gymRepository.delete(id);
  }
}