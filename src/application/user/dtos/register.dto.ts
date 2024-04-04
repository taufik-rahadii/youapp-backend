import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Match } from '../../../core/validators/isMatch';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Match('password', {
    message: 'password confirmation failed',
  })
  password_confirmation: string;
}

export class RegisterResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  _id: string;
}
