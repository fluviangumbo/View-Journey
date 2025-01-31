import { Worker, Job } from 'bullmq';
import dotenv from 'dotenv';
import mongoose from '../../config/connection.js';
import fetch from 'node-fetch';
import { Movie, TVShow, Person } from '../../models/index.js';

dotenv.config(); // see queue, nto sure if we need this

const API_KEY = process.env.TMDB_API_KEY;
const API_URL = process.env.TMDB_API_URL;

const worker = new Worker(
    'apiQueue',
    async (job: Job) => {
        const { itemId } = job.data;
        try {
            const response = await fetch(`${API_URL}`) // WORKING HERE - see bullmq and modularizing question
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error processing item ${itemId}: ${error.message}`);

                if (error.message.includes('429')) {
                    await job.retry();
                }
            } else {
                console.error(`Unknown error: ${JSON.stringify(error)}`);
            }
        }
    },
    { connection: { host: '127.0.0.1', port: 6379 } }
);