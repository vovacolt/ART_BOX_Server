/**
 * Модуль для работы с паролем и токеном
 */
const uniqid = require('uniqid');
const crypto = require('crypto');

/**
 * Чек-сумма
 * @param str 
 * @param algorithm 
 * @param encoding 
 */
export function Checksum(str: string, algorithm?: string, encoding?: string) 
{
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

/**
 * Генерирует токен
 */
export function GeneratedToken(): string 
{
    return Checksum(uniqid());
}
