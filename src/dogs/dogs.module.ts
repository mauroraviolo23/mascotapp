import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

import { Pet } from 'src/common/entity/pet.entity';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [TypeOrmModule.forFeature([Pet])],
})
export class DogsModule {}
