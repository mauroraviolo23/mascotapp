import { IsIn, IsNumber, IsString, IsUUID, Length } from 'class-validator';
import { User } from 'src/users/entity/user.entity';

export class PetDto {
  @IsString()
  @Length(2, 20)
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsIn(['Dog', 'Cat', 'Turtle', 'Horse', 'Rabbit'])
  type: string;

  @IsString()
  owner: User;
}
