import { Injectable, NotFoundException } from '@nestjs/common';
import { PetDto } from 'src/common/dto/pets.dto';
import { UpdatePetsDto } from 'src/common/dto/update-pets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Pet } from 'src/common/entity/pet.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Pet)
    private dogsRepository: Repository<Pet>,
  ) {}

  getAll() {
    return this.dogsRepository.find();
  }

  getById(id: string): Promise<Pet> {
    return this.dogsRepository.findOneBy({ id });
  }

  async insert(body: PetDto) {
    const dog = this.dogsRepository.create({
      id: uuidv4(),
      ...body,
    });
    await this.dogsRepository.save(dog);
    return dog;
  }

  async update(id: string, body: UpdatePetsDto) {
    const dog = {
      id,
      ...body,
    };
    const updatedDog = await this.dogsRepository.preload(dog);
    if (updatedDog) return this.dogsRepository.save(updatedDog);
    throw new NotFoundException(`No se encuentra el perro con id: ${id}`);
  }

  async delete(id: string) {
    const dog = await this.dogsRepository.findOneBy({ id });
    if (dog) return this.dogsRepository.remove(dog);
    throw new NotFoundException(`No se encuentra el perro con id: ${id}`);
  }
  // dogs: PetDto[] = [
  //   {
  //     id: '394',
  //     name: 'Totazo',
  //     age: 4,
  //     type: 'Dog',
  //   },
  // ];
  // findAll(): PetDto[] {
  //   return this.dogs;
  // }
  // findById(id: string): PetDto {
  //   const dog: PetDto = this.dogs.find((dog) => dog.id === id);
  //   return dog;
  // }
  // create(dog: PetDto): string {
  //   this.dogs.push({
  //     id: uuidv4(),
  //     name: dog.name,
  //     age: dog.age,
  //     type: dog.type,
  //   });
  //   return `El perro de nombre ${dog.name} fue agregado a la base de datos`;
  // }
  // update(id: string, dogUpdate: UpdatePetsDto): PetDto {
  //   let foundDog: PetDto = this.findById(id);
  //   this.dogs = this.dogs.map((dog) => {
  //     if (dog.id === id) {
  //       foundDog = { ...foundDog, ...dogUpdate };
  //       return foundDog;
  //     }
  //     return dog;
  //   });
  //   return foundDog;
  // }
  // remove(id: string): PetDto[] | string {
  //   if (this.findById(id) === undefined) {
  //     return `No se encontró ningún perro con id: ${id}. No se ha borrado ningún elemento.`;
  //   }
  //   this.dogs = this.dogs.filter((dog) => dog.id !== id);
  //   return this.dogs;
  // }
}
