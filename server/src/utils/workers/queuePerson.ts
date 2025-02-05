// import cron from 'node-cron';
import fetch from 'node-fetch';
import { personQueue } from './queues';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = process.env.TMDB_API_BASE_URL;

const MAX_RETRIES = 5

async function fetchPopularPeople(page = 1, retries = 0) {
    try {
        const res = await fetch(`${API_BASE_URL}/person/popular?apiKey=${API_KEY}&page=${page}`);

        if (!res.ok) throw new Error(`Error fetching people on page ${page}`);

        const data = await res.json();

        for (const person of data.results) {
            await personQueue.add('fetchPerson', { itemId: person.id });
        }

        console.log(`Scheduled ${data.results.length} people from page ${page}`);

        if (page < data.total_pages) {
            console.log(`✅ Processed page ${page}, fetching page ${page + 1}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await fetchPopularPeople(page + 1);
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(`❌ Error fetching popular people: ${err.message}`);

            if (err.message.includes('429')) {
                console.warn(`!!! Rate limit hit! Retrying movie page fetch in 1 minute...`);
                setTimeout(() => fetchPopularPeople(page), 60 * 1000);
            } else {
                if (retries < MAX_RETRIES) {
                    console.log(`Retrying fetch of page ${page} (attempt ${retries + 1}/${MAX_RETRIES})...`);
                    setTimeout(() => fetchPopularPeople(page, retries + 1), 5000);
                }
            }
        } else {
            console.log(`Unknown Error: ${JSON.stringify(err)}`);
        }
    }
}