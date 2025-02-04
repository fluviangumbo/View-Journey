import { Queue } from 'bullmq';

export const movieQueue = new Queue('movieQueue', { connection: { host: '127.0.0.1', port: 6379 } });
export const tvShowQueue = new Queue('tvShowQueue', { connection: { host: '127.0.0.1', port: 6379 } });
export const personQueue = new Queue('personQueue', { connection: { host: '127.0.0.1', port: 6379 } });