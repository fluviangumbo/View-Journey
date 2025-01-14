import { Schema, model, Document } from 'mongoose';

interface IGenreTV extends Document {
    tmdbID: Schema.Types.ObjectId;
    name: string;
}

const genreTVSchema = new Schema<IGenreTV>(
    {
        _id: {
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

const GenreTV = model<IGenreTV>('Genre, TV', genreTVSchema);

export default GenreTV;