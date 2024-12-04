import CryptoJS from 'crypto-js';

const CRYPTO_SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY

export function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_SECRET_KEY).toString();
    
}

export function decryptData(encryptedData) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
    }
}