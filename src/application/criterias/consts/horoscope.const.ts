enum HoroscopeSign {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

const HOROSCOPE_SIGN_RANGE: {
  sign: HoroscopeSign;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}[] = [
    {
      sign: HoroscopeSign.Aries,
      startMonth: 3,
      startDay: 21,
      endMonth: 4,
      endDay: 19,
    },
    {
      sign: HoroscopeSign.Taurus,
      startMonth: 4,
      startDay: 20,
      endMonth: 5,
      endDay: 20,
    },
    {
      sign: HoroscopeSign.Gemini,
      startMonth: 5,
      startDay: 21,
      endMonth: 6,
      endDay: 21,
    },
    {
      sign: HoroscopeSign.Cancer,
      startMonth: 6,
      startDay: 22,
      endMonth: 7,
      endDay: 22,
    },
    {
      sign: HoroscopeSign.Leo,
      startMonth: 7,
      startDay: 23,
      endMonth: 8,
      endDay: 22,
    },
    {
      sign: HoroscopeSign.Virgo,
      startMonth: 8,
      startDay: 23,
      endMonth: 9,
      endDay: 22,
    },
    {
      sign: HoroscopeSign.Libra,
      startMonth: 9,
      startDay: 23,
      endMonth: 10,
      endDay: 23,
    },
    {
      sign: HoroscopeSign.Scorpio,
      startMonth: 10,
      startDay: 24,
      endMonth: 11,
      endDay: 21,
    },
    {
      sign: HoroscopeSign.Sagittarius,
      startMonth: 11,
      startDay: 22,
      endMonth: 12,
      endDay: 21,
    },
    {
      sign: HoroscopeSign.Capricorn,
      startMonth: 12,
      startDay: 22,
      endMonth: 1,
      endDay: 19,
    },
    {
      sign: HoroscopeSign.Aquarius,
      startMonth: 1,
      startDay: 20,
      endMonth: 2,
      endDay: 18,
    },
    {
      sign: HoroscopeSign.Pisces,
      startMonth: 2,
      startDay: 19,
      endMonth: 3,
      endDay: 20,
    },
  ];
