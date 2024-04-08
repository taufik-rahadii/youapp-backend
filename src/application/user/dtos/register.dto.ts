import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Match } from '../../../core/validators/isMatch';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsAlphanumeric()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @Match('password', {
    message: 'password confirmation failed',
  })
  @ApiProperty()
  password_confirmation: string;
}

export class RegisterResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  _id: string;
}
