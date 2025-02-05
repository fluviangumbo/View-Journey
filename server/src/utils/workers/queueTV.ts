// import cron from 'node-cron';
import fetch from 'node-fetch';
import { tvShowQueue } from './queues';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = process.env.TMDB_API_BASE_URL;

async function fetchPopularTV(page = 1) {
    try {
        const res = await fetch(`${API_BASE_URL}/tv/popular?apiKey=${API_KEY}&page=${page}`);

        if (!res.ok) throw new Error(`Error fetching tv shows from page ${page}`);

        const data = await res.json();

        for (const tvShow of data.results) {
            await tvShowQueue.add('fetchTVShow', { itemId: tvShow.id });
        }

        console.log(`Scheduled ${data.results.length} tv shows from page ${page}`);

        if (page < data.total_pages) {
            console.log(`✅ Processed page ${page}, fetching page ${page + 1}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await fetchPopularTV(page + 1);
        }

    } catch (err) {
        if (err instanceof Error) {
            console.error(`❌ Error fetching popular tv shows: ${err.message}`);

            if (err.message.includes('429')) {
                console.warn(`!!! Rate limit hit! Retrying movie page fetch in 1 minute...`);
                setTimeout(() => fetchPopularTV(page), 60 * 1000);
            }
        }

        else {
            console.log(`Unknown Error: ${JSON.stringify(err)}`);
        }
    }
}