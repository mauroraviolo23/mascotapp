import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PetDto } from 'src/common/dto/pets.dto';
import { UpdatePetsDto } from 'src/common/dto/update-pets.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/all')
  getAll() {
    return this.catsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.catsService.getById(id);
  }

  @Post()
  create(@Body() createCatDto: PetDto) {
    return this.catsService.insert(createCatDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCatDto: UpdatePetsDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.catsService.delete(id);
  }
}
