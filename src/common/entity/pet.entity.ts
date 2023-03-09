import { User } from 'src/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Pets')
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('int')
  age: number;

  @Column('varchar')
  type: string;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;
}
