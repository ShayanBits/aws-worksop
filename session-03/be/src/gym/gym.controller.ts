import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GymService } from './gym.service';
import { Gym } from './gym.entity';

@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get()
  findAll(): Promise<Gym[]> {
    return this.gymService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Gym | null> {
    return this.gymService.findOne(id);
  }

  @Post()
  create(@Body() gym: Partial<Gym>): Promise<Gym> {
    return this.gymService.create(gym);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() gym: Partial<Gym>): Promise<Gym> {
    return this.gymService.update(id, gym);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.gymService.delete(id);
  }
}