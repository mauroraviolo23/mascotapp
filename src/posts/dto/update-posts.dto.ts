import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entity/user.entity';

export class UpdatePostDto {
  @IsString()
  body: string;
}
