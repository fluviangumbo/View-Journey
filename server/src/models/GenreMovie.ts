import { Schema, model, Document } from 'mongoose';

interface IGenreMovie extends Document {
    tmdbID: Schema.Types.ObjectId;
    name: string;
}

const genreMovieSchema = new Schema<IGenreMovie>(
    {
        tmdbID: {
            type: Schema.Types.ObjectId,
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
        _id: false,
    }
)

const GenreMovie = model<IGenreMovie>('Genre, Movies', genreMovieSchema);

export default GenreMovie;