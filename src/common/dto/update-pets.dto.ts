import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePetsDto {
  @IsString()
  @Length(2, 20)
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
