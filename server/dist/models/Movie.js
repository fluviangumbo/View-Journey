import { Schema, model } from 'mongoose';
const movieSchema = new Schema({
    tmdbID: {
        type: Schema.Types.ObjectId,
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
}, {
    _id: false,
});
const Movie = model('Movie', movieSchema);
export default Movie;
