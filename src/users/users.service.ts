import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAll() {
    return this.usersRepository.find();
  }

  getById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async insert(body: UserDto) {
    const user = this.usersRepository.create({
      id: uuidv4(),
      ...body,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async update(id: string, body: UpdateUserDto) {
    const user = {
      id,
      ...body,
    };
    const updatedUser = await this.usersRepository.preload(user);
    if (updatedUser) return this.usersRepository.save(updatedUser);
    throw new NotFoundException(`No se encuentra el user con id: ${id}`);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) return this.usersRepository.remove(user);
    throw new NotFoundException(`No se encuentra el user con id: ${id}`);
  }
  // users: UserDto[] = [
  //   {
  //     id: uuidv4(),
  //     name: 'Lionel Messi',
  //     email: 'lionelmessi@gmail.com',
  //     age: 35,
  //     married: true,
  //   },
  // ];

  // findAll(): UserDto[] {
  //   return this.users;
  // }

  // findById(id: string): UserDto {
  //   const user: UserDto = this.users.find((user) => user.id === id);
  //   return user;
  // }

  // create(user: UserDto): string {
  //   this.users.push({
  //     id: uuidv4(),
  //     name: user.name,
  //     email: user.email,
  //     age: user.age,
  //     married: user.married,
  //   });
  //   return `El user de nombre ${user.name} fue agregado a la base de datos`;
  // }

  // update(id: string, userUpdate: UpdateUserDto): UserDto {
  //   let foundUser: UserDto = this.findById(id);

  //   this.users = this.users.map((user: UserDto): UserDto => {
  //     if (user.id === id) {
  //       foundUser = { ...foundUser, ...userUpdate };
  //       return foundUser;
  //     }
  //     return user;
  //   });
  //   return foundUser;
  // }

  // remove(id: string): UserDto[] | string {
  //   if (this.findById(id) === undefined) {
  //     return `No se encontró un user con id: ${id}. No se ha borrado ningún elemento.`;
  //   }
  //   this.users = this.users.filter((user: UserDto) => user.id !== id);
  //   return this.users;
  // }
}
