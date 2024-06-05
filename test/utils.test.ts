import { Utils } from '../src/utils/utils';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');
const utils = new Utils();

describe('ValidationUtils', () => {
    test('isInteger', () => {
        expect(utils.isInteger(5)).toBe(true);
        expect(utils.isInteger('5')).toBe(false);
        expect(utils.isInteger(5.5)).toBe(false);
    });

    test('isPositiveNumber', () => {
        expect(utils.isPositiveNumber(5)).toBe(true);
        expect(utils.isPositiveNumber(-5)).toBe(false);
        expect(utils.isPositiveNumber(0)).toBe(false);
        expect(utils.isPositiveNumber('5')).toBe(false);
    });

    test('isNonEmptyString', () => {
        expect(utils.isNonEmptyString('hello')).toBe(true);
        expect(utils.isNonEmptyString('')).toBe(false);
        expect(utils.isNonEmptyString(' ')).toBe(false);
        expect(utils.isNonEmptyString(5)).toBe(false);
    });

    test('isNonEmptyArray', () => {
        expect(utils.isNonEmptyArray([1, 2, 3])).toBe(true);
        expect(utils.isNonEmptyArray([])).toBe(false);
        expect(utils.isNonEmptyArray('not an array')).toBe(false);
    });

    test('isObject', () => {
        expect(utils.isObject({})).toBe(true);
        expect(utils.isObject(null)).toBe(false);
        expect(utils.isObject([])).toBe(true); // En JavaScript, los arrays son objetos
        expect(utils.isObject('string')).toBe(false);
    });

    test('isFunction', () => {
        expect(utils.isFunction(() => {})).toBe(true);
        expect(utils.isFunction(function() {})).toBe(true);
        expect(utils.isFunction(5)).toBe(false);
    });

    test('isValidEmail', () => {
        expect(utils.isValidEmail('test@example.com')).toBe(true);
        expect(utils.isValidEmail('invalid-email')).toBe(false);
        expect(utils.isValidEmail('test@.com')).toBe(false);
    });

    test('isValidURL', () => {
        expect(utils.isValidURL('http://example.com')).toBe(true);
        expect(utils.isValidURL('https://example.com')).toBe(true);
        expect(utils.isValidURL('ftp://example.com')).toBe(true);
        expect(utils.isValidURL('invalid-url')).toBe(false);
    });

    test('isValidDate', () => {
        expect(utils.isValidDate('2020-01-01')).toBe(true);
        expect(utils.isValidDate('invalid-date')).toBe(false);
        expect(utils.isValidDate('')).toBe(false);
    }); 
});

jest.mock('bcrypt');

describe('Encryption functions', () => {
    const password = 'myPassword';
    const hashedPassword = '$2b$10$saltsalt';
  
    beforeEach(() => {
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    });
  
    test('encrypt', async () => {
      const result = await utils.encrypt(password);
      expect(result).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  
    test('compareEncrypt', async () => {
      const result = await utils.compareEncrypt(hashedPassword, password);
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(hashedPassword, password);
    });
});
