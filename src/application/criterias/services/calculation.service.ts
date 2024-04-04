import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class CalculationService {
  constructor() { }

  private START_YEAR = 1900;

  async calculateZodiacAnimal(dob: Date): Promise<ZodiacAnimal> {
    const year = dob.getFullYear();
    const animalIndex =
      (year - this.START_YEAR) % Object.keys(ZodiacAnimal).length;

    return Promise.resolve(ZodiacAnimal[animalIndex] as ZodiacAnimal);
  }

  async calculateHoroscopeSign(dob: Date): Promise<string> {
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
