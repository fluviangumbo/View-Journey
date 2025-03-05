import cron from 'node-cron';
import fetch from 'node-fetch';
import { createWriteStream, createReadStream, mkdirSync } from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { movieQueue } from './queues';
import dotenv from 'dotenv';

dotenv.config();

// const API_KEY = process.env.TMDB_API_KEY;
// const API_BASE_URL = process.env.TMDB_API_BASE_URL;
const ID_LIST_BASE_URL = process.env.TMDB_ID_LIST_BASE_URL;

const streamPipeline = promisify(pipeline);

async function fetchMovieIDs() { // Need ot update with the url for ids and setup - no longer usiong a response call from API
    //Instead we need to pull the list from ID_LIST url and change with current date and access teh document we get - use a function like this to populate queues
    try {
        const date = new Date(Date.now());

        const month = () => {
            const monthString = (date.getMonth() + 1).toString();

            if (monthString.length == 1) {
                return '0' + monthString;
            }

            return monthString;
        }

        const day = () => {
            const dayString = (date.getDate()).toString();

            if (dayString.length == 1) {
                return '0' + dayString;
            }

            return dayString;
        }

        const year = (date.getFullYear()).toString();

        const urlDate = `_${month()}_${day()}_${year}`;

        const res = await fetch(`${ID_LIST_BASE_URL}/movie_ids${urlDate}.json.gz`);

        if (!res.ok) throw new Error(`Error fetching IDs: ${res.status} ${res.statusText}`);

        const dir = path.resolve(__dirname, '/server/src/util/downloads');
        mkdirSync(dir, { recursive: true });

        const fileName = `movieIDs${urlDate}.json`;
        const filePath = path.join(dir, fileName);

        const fileStream = createWriteStream(filePath);
        await streamPipeline(res.body as any, fileStream);

        console.log(`Movie Ids downloaded to ${filePath}`);

        // const data = await res.json();
    
        // for (const movie of data.results) {
        //     await movieQueue.add('fetchMovie', { itemId: movie.id });
        // }

        // console.log(`Scheduled ${data.results.length} movies from page ${page}`);
    
        // if (page < data.total_pages) {
        //     console.log(`✅ Processed page ${page}, fetching page ${page + 1}...`);
        //     await new Promise(resolve => setTimeout(resolve, 1000));
        //     await fetchPopularMovies(page + 1);
        // }
    } catch (err) {
        if (err instanceof Error) {
            console.error(`❌ Error fetching movie IDs: ${err.message}`);

            // if (err.message.includes('429')) {
            //     console.warn(`!!! Rate limit hit! Retrying movie page fetch in 1 minute...`);
            //     setTimeout(() => fetchPopularMovies(page), 60 * 1000);
            // }

        } else {
            console.error(`Unknown error: ${JSON.stringify(err)}`);
        }
    }
}

export default fetchMovieIDs;

// cron.schedule('', () => fetchPopularMovies(1)); not sure how we want to handle this, may not need ot be a cron job at all until we get to the updating endpoint

// NEW PLAN - we will export these functions to a central queuer who will use a cron job to pull the new id JSON for all three data types and then will run all three functions as part of larger functions that call the workers to process the queue, then once it is complete, we will start the next function which will also allow it's worker to process it's queue, etc.

// See notes above, refamiliarizing with code