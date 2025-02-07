// import cron from 'node-cron';
import fetch from 'node-fetch';
import { movieQueue } from './queues';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = process.env.TMDB_API_BASE_URL;

async function fetchPopularMovies(page = 1) {
    try {
        const res = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);

        if (!res.ok) throw new Error(`Error fetching movies on page ${page}`);

        const data = await res.json();
    
        for (const movie of data.results) {
            await movieQueue.add('fetchMovie', { itemId: movie.id });
        }

        console.log(`Scheduled ${data.results.length} movies from page ${page}`);
    
        if (page < data.total_pages) {
            console.log(`✅ Processed page ${page}, fetching page ${page + 1}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await fetchPopularMovies(page + 1);
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(`❌ Error fetching popular movies: ${err.message}`);

            if (err.message.includes('429')) {
                console.warn(`!!! Rate limit hit! Retrying movie page fetch in 1 minute...`);
                setTimeout(() => fetchPopularMovies(page), 60 * 1000);
            }

        } else {
            console.error(`Unknown error: ${JSON.stringify(err)}`);
        }
    }
}

export default fetchPopularMovies;

// cron.schedule('', () => fetchPopularMovies(1)); not sure how we want to handle this, may not need ot be a cron job at all until we get to the updating endpoint

// NEW PLAN - we will export these functions to a central queuer who will use a cron job to pull the new id JSON for all three data types and then will run all three functions as part of larger functions that call the workers to process the queue, then once it is complete, we will start the next function which will also allow it's worker to process it's queue, etc.