import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PetDto } from 'src/common/dto/pets.dto';
import { UpdatePetsDto } from 'src/common/dto/update-pets.dto';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get('/all')
  getAll() {
    return this.dogsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.dogsService.getById(id);
  }

  @Post()
  create(@Body() createDogDto: PetDto) {
    return this.dogsService.insert(createDogDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdatePetsDto) {
    return this.dogsService.update(id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.delete(id);
  }
}
