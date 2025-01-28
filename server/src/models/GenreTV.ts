import { Schema, model, Document } from 'mongoose';

interface IGenreTV extends Document {
    tmdbID: number;
    name: string;
};

const genreTVSchema = new Schema<IGenreTV>(
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

const GenreTV = model<IGenreTV>('Genre, TV', genreTVSchema);

export default GenreTV;