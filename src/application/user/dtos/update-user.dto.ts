import { Gender } from '../enums/gender.enum';

export class UpdateUserDTO {
  fullname?: string;

  username?: string;

  password: string;

  email?: string;

  gender?: Gender;

  dob?: string;

  height?: number;

  weight?: number;

  zodiac?: ZodiacAnimal;

  horoscope?: HoroscopeSign;

  avatar?: Express.Multer.File;

  interest?: string[];
}
