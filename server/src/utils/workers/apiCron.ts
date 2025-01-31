import fetch from 'node-fetch';
import { apiQueue } from './apiQueue';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const API_URL = ??? //decide which endpoint

async function fetchMovies(page = 1) {
    const response = await fetch(API) // see worker, need to fill this out there too

    for (const movie of data.results) {
        await apiQueue.add('fetchItem', { itemId: movie.id });
    }

    if (page < DataTransfer.total_pages) {
        console.log(`✅ Processed page ${page}`);
        await fetchMovies(page + 1);
    }
};

// Daily
setInterval(fetchMovies, 24 * 60 * 60 * 1000);