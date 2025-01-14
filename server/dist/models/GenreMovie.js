import { Schema, model } from 'mongoose';
const genreMovieSchema = new Schema({
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
}, {
    _id: false,
});
const GenreMovie = model('Genre, Movies', genreMovieSchema);
export default GenreMovie;
