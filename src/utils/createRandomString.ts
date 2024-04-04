import { customAlphabet } from 'nanoid';

/**
 *
 * @param length length of expected string
 * @param mask character containing
 * @returns random string
 * @description Generate random string from given mask string and length.
 */
export const createRandomString = (length: number, mask: string = 'aA0') => {
  let chars = '';

  if (mask.indexOf('a') > -1) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (mask.indexOf('A') > -1) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (mask.indexOf('0') > -1) chars += '0123456789';
  if (mask.indexOf('~') > -1) chars += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

  const rand = customAlphabet(chars, length);
  return rand();
};
