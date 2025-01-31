import { Queue } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config(); // Unsure if we need this since it is in connection.ts

export const apiQueue = new Queue('apiQueue', {
    connection: { host: '127.0.0.1', port: 6379 } // local redis connection, in production will need this elsewhere I think, check bullmq/redis docs tonight
});