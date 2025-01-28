import { Schema, model, Document } from 'mongoose';

interface IGenreMovie extends Document {
    tmdbID: number;
    name: string;
};

const genreMovieSchema = new Schema<IGenreMovie>(
    {
        tmdbID: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        _id: true,
    },
);

const GenreMovie = model<IGenreMovie>('Genre, Movies', genreMovieSchema);

export default GenreMovie;