import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UserDto {
  @IsString()
  @Length(2, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

  @IsBoolean()
  married: boolean;
}
