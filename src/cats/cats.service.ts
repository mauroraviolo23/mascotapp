import { Injectable, NotFoundException } from '@nestjs/common';
import { PetDto } from 'src/common/dto/pets.dto';
import { UpdatePetsDto } from 'src/common/dto/update-pets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { Pet } from 'src/common/entity/pet.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Pet)
    private catsRepository: Repository<Pet>,
  ) {}

  getAll() {
    return this.catsRepository.find();
  }

  getById(id: string): Promise<Pet> {
    return this.catsRepository.findOneBy({ id });
  }

  async insert(body: PetDto) {
    const cat = this.catsRepository.create({
      id: uuidv4(),
      ...body,
    });
    await this.catsRepository.save(cat);
    return cat;
  }

  async update(id: string, body: UpdatePetsDto) {
    const cat = {
      id,
      ...body,
    };
    const updatedCat = await this.catsRepository.preload(cat);
    if (updatedCat) return this.catsRepository.save(updatedCat);
    throw new NotFoundException(`No se encuentra el gato con id: ${id}`);
  }

  async delete(id: string) {
    const cat = await this.catsRepository.findOneBy({ id });
    if (cat) return this.catsRepository.remove(cat);
    throw new NotFoundException(`No se encuentra el gato con id: ${id}`);
  }
  // cats: PetDto[] = [{ id: '123', name: 'Pepe', age: 5, type: 'Cat' }];
  // findAll(): PetDto[] {
  //   return this.cats;
  // }
  // findById(id: string): PetDto {
  //   const result: PetDto = this.cats.find((cat) => cat.id === id);
  //   return result;
  // }
  // create(cat: PetDto): string {
  //   const newId = uuidv4();
  //   this.cats.push({
  //     id: newId,
  //     name: cat.name,
  //     age: cat.age,
  //     type: cat.type,
  //   });
  //   return `El gato de nombre ${cat.name} fue agregado a la base de datos.`;
  // }
  // update(id: string, catUpdate: UpdatePetsDto): PetDto {
  //   let foundCat = this.findById(id);
  //   this.cats = this.cats.map((cat) => {
  //     if (cat.id === id) {
  //       foundCat = { ...foundCat, ...catUpdate };
  //       return foundCat;
  //     }
  //     return cat;
  //   });
  //   return foundCat;
  // }
  // remove(id: string): PetDto[] | string {
  //   if (this.findById(id) === undefined) {
  //     return `No se encontró un gato con id: ${id}. No se ha borrado ningún elemento`;
  //   }
  //   this.cats = this.cats.filter((cat) => cat.id !== id);
  //   return this.cats;
  // }
}
