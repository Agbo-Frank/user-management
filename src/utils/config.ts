import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;

export const DEV_MAILS = process.env.DEV_MAILS?.split(',') || [];
