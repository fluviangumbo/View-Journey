import { Schema, model, Document } from 'mongoose';
// import { GenreMovie } from './GenreMovie.js';

interface IMovie extends Document {
    tmdbID: number;
    title: string;
    tagline: string;
    releaseDate: string;
    runtime: number;
    revenue: number;
    overview: string;
    genre: Schema.Types.ObjectId[]; // Could do this as GenreMovie rather than ref
    budget: number;
    posterPath: string;
    cast: Schema.Types.ObjectId[];
    crew: Schema.Types.ObjectId[];
};

const movieSchema = new Schema<IMovie>(
    {
        tmdbID: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            unique: false,
        },
        tagline: {
            type: String,
            required: false,
            unique: false,
        },
        releaseDate: {
            type: String,
            required: false,
            unique: false,
        },
        runtime: {
            type: Number,
            required: false,
            unique: false,
        },
        revenue: {
            type: Number,
            required: false,
            unique: false,
        },
        overview: {
            type: String,
            required: false,
            unique: false,
        },
        genre: [{
            type: Schema.Types.ObjectId,
            ref: 'Genre, Movie'
        }],
        budget: {
            type: Number,
            required: false,
            unique: false,
        },
        posterPath: {
            type: String,
            required: false,
            unique: false,
        },
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Person',
        }],
        crew: [{
            type: Schema.Types.ObjectId,
            ref: 'Person',
        }]
    },
    {
        _id: true,
    },
);

const Movie = model<IMovie>('Movie', movieSchema);

export default Movie;