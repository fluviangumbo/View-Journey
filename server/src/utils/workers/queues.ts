import { Queue } from 'bullmq';

export const movieQueue = new Queue('movieQueue', { connection: { host: '127.0.0.1', port: 6379 } });
export const tvShowQueue = new Queue('tvShowQueue', { connection: { host: '127.0.0.1', port: 6379 } });
export const personQueue = new Queue('personQueue', { connection: { host: '127.0.0.1', port: 6379 } });

// THERE IS A DAILY ID EXPORT FROM TMDB --- oh man we don't need any of the queues or the job that will fill the queue... well it was fun to learn! glad, this will be easier, looking at movies seems like there is 1mil+, around 6.5 hours to import with rate limited to 45