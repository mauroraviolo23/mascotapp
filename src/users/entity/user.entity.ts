import { Pet } from 'src/common/entity/pet.entity';
import { Post } from 'src/posts/entity/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  age: number;

  @Column('boolean')
  married: boolean;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
