import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';
import { Expose } from 'class-transformer';

export class UserProfileDTO {
  @ApiProperty()
  @Expose()
  _id: string;
  @ApiProperty()
  @Expose()
  fullname?: string;
  @ApiProperty()
  @Expose()
  email?: string;
  @ApiProperty()
  @Expose()
  username?: string;
  @Expose()
  @ApiProperty()
  gender?: Gender;
  @Expose()
  @ApiProperty()
  horoscope?: HoroscopeSign;
  @Expose()
  @ApiProperty()
  zodiac?: ZodiacAnimal;
  @Expose()
  @ApiProperty()
  dob?: string;
  @ApiProperty()
  @Expose()
  avatar?: string;
  @ApiProperty()
  @Expose()
  height?: number;
  @ApiProperty()
  @Expose()
  weight?: number;
  @ApiProperty()
  @Expose()
  interest?: string[];
}
