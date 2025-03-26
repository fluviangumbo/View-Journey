import { Worker, Job } from 'bullmq';
import dotenv from 'dotenv';
// import db from '../../config/connection.js';
import fetch from 'node-fetch';
import itemConfigs from './itemConfig';

dotenv.config(); // see queue, not sure if we need this

const API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = process.env.TMDB_API__BASE_URL;

function createWorker(queueName: string, itemType: 'movies' | 'tvShows' | 'people') {
    return new Worker(
        queueName,
        async (job: Job) => {
            const { itemId } = job.data;
            const config = itemConfigs[itemType];

            const model = config.model;
            const endpoint = config.endpoint;

            try {
                const res = await fetch(`${API_BASE_URL}/${endpoint}/${itemId}?api_key=${API_KEY}`);
                if (!res.ok) throw new Error(`Error fetching ${itemType} ${itemId}`);

                const data = await res.json();

                await model.findOneAndUpdate(
                    { tmdbID: data.id },
                    { ...data, lastUpdated: new Date() },
                    { upsert: true, new: true }
                );

                console.log(`✅ Processed ${itemType}: ${data.name || data.title}`);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(`❌ Error processing ${itemType} ${itemId}: ${err.message}`);

                    if (err.message.includes('429')) {
                        console.warn(`!!! Rate limit hit! Retrying ${itemId} in 1 minute...`);
                        await new Promise(resolve => setTimeout(resolve, 60 * 1000));
                        await job.retry();
                    }
                } else {
                    console.error(`Unknown error: ${JSON.stringify(err)}`);
                }
            }
        },
        { 
            connection: { host: '127.0.0.1', port: 6379 },
            limiter: { max: 45, duration: 1000 }
        }
    );
}

const movieWorker = createWorker('movieQueue', 'movies');
const tvShowWorker = createWorker('tvShowQueue', 'tvShows');
const personWorker = createWorker('personQueue', 'people');

export { movieWorker, tvShowWorker, personWorker };

// Adding a plugin to connect with a streaming service and then show your or another person's queues and relationships so you can viewport into how another person sees the film landscape