import crypto from 'crypto';

export const encrypt = (text : string) => crypto.createHash('sha256').update(text).digest('hex');