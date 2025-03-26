import fetch from 'node-fetch';
import redis from '../config/redis';
import { IMovie } from '../models/Movie';
import { ITVShow } from '../models/TVShow';
import { IPerson } from '../models/Person';
// import { Movie, TVShow, Person } from '../models/index';

const apiKey = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_API_BASE_URL;

// Searching for a film
const filmSearch = async (film: string): Promise<IMovie[]> => {
    const query = film.replace(' ', '%20');
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const films = await res.json();
        console.log(films);

        return films.results || [];
    } catch(err) {
        console.error("Error fetching movies:", err);
        return [];
    }
}

const tvSearch = async (show: string): Promise<ITVShow[]> => {
    const query = show.replace(' ', '%20');
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const shows = await res.json();
        console.log(shows);

        return shows.results || [];
    } catch(err) {
        console.error("Error fetching shows:", err);
        return [];
    }
}

const personSearch = async (name: string): Promise<IPerson[]> => {
    const query = name.replace(' ', '%20');
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const people = await res.json();
        console.log(people);

        return people.results || [];
    } catch(err) {
        console.error("Error fetching people:", err);
        return [];
    }
}

// We can handle searches as above, but will have the caching happen once a film has been selected for full details
const getMovieDetails = async (movieId: number) => {
    const cacheKey = `movie:${movieId}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    const url = `${BASE_URL}/movie/${movieId}?language=en-US`;

    try{
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
        });
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)

        const movie = await res.json();
        await redis.setEx(cacheKey, 7* 24 * 60 * 60, JSON.stringify(movie));

        return movie;
    } catch (err) {
        console.error("Error fetching movie details:", err);
        return;
    }
}

const getTVShowDetails = async (showId: number) => {
    const cacheKey = `show:${showId}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    const url = `${BASE_URL}/tv/${showId}?language=en-US`;

    try{
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
        });
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)

        const tvShow = await res.json();
        await redis.setEx(cacheKey, 7* 24 * 60 * 60, JSON.stringify(tvShow));

        return tvShow;
    } catch (err) {
        console.error("Error fetching TV show details:", err);
        return;
    }
}

const getPersonDetails = async (personId: number) => {
    const cacheKey = `person:${personId}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    const url = `${BASE_URL}/person/${personId}?language=en-US`;

    try{
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
        });
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)

        const person = await res.json();
        await redis.setEx(cacheKey, 7* 24 * 60 * 60, JSON.stringify(person));

        return person;
    } catch (err) {
        console.error("Error fetching person details:", err);
        return;
    }
}

export { filmSearch, tvSearch, personSearch, getMovieDetails, getTVShowDetails, getPersonDetails };

// This is new direction - but we will cache results instead of storing in our database