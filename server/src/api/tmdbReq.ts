import fetch from 'node-fetch';
import { IMovie } from '../models/Movie';
import { Movie, TVShow, Person } from '../models/index';

// Searching for a film
const filmSearch = async (film: string): Promise<IMovie[]> => {
    const query = film.replace(' ', '%20');
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    try {
        const res = await fetch(url, { method: 'GET' });
        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const films = await res.json();
        console.log(films);

        return films.results.map((movie: IMovie) => new Movie(movie)) || [];
    } catch(err) {
        console.error("Error fetching movie:", err);
        return [];
    }
}