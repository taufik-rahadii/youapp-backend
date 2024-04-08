import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  isEmpty,
  isNotEmpty,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateProfileDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  gender: Gender;

  @IsDateString()
  @ApiProperty()
  @IsOptional()
  dob: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  weight: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  height: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (isNotEmpty(value) ? String(value).split(',') : []))
  @ApiProperty()
  interest: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  avatar: any;
}
