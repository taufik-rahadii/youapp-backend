import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ZodiacAnimal } from '../consts/zodiac.const';
import { HOROSCOPE_SIGN_RANGE, HoroscopeSign } from '../consts/horoscope.const';

@Injectable()
export class CalculationService {
  constructor() { }

  private START_YEAR = 1900;

  async calculateZodiacAnimal(dob: Date): Promise<ZodiacAnimal> {
    const year = dob.getFullYear();
    const animalIndex =
      (year - this.START_YEAR) % Object.keys(ZodiacAnimal).length;

    const zodiacs = Object.values(ZodiacAnimal);
    const zodiac = ZodiacAnimal[zodiacs[animalIndex]];
    return Promise.resolve(zodiac);
  }

  async calculateHoroscopeSign(dob: Date): Promise<HoroscopeSign> {
    const birthMonth = dob.getMonth() + 1;
    const birthDay = dob.getDate();

    for (const signRange of HOROSCOPE_SIGN_RANGE) {
      if (
        (birthMonth === signRange.startMonth &&
          birthDay >= signRange.startDay) ||
        (birthMonth === signRange.endMonth && birthDay <= signRange.endDay) ||
        (birthMonth > signRange.startMonth && birthMonth < signRange.endMonth)
      ) {
        return signRange.sign;
      }
    }

    throw new UnprocessableEntityException('Invalid date of birth');
  }
}
