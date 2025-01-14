import { Schema, model, Document } from 'mongoose';

interface ITVShow extends Document {
    tmdbID: Schema.Types.ObjectId;
    name: string;
    createdBy: Schema.Types.ObjectId[];
    startAirDate: string;
    lastAirDate: string;
    genres: Schema.Types.ObjectId[];
    seasons: number;
    episodes: number;
    overview: string;
    posterPath: string;
    tagline: string;
}

const tvSchema = new Schema<ITVShow>(
    {
        tmdbID: {
            type: Schema.Types.ObjectId,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            unique: false,
            required: true,
        },
        createdBy: [{
            type: Schema.Types.ObjectId,
            ref: 'Person',
        }],
        startAirDate: {
            type: String,
        },
        lastAirDate: {
            type: String,
        },
        genres: [{
            type: Schema.Types.ObjectId,
            ref: 'Genre, TV',
        }],
        seasons: {
            type: Number,
        },
        episodes: {
            type: Number,
        },
        overview: {
            type: String,
        },
        posterPath: {
            type: String,
        },
        tagline: {
            type: String,
        },
    },
    {
        _id: false,
    },
);

const TVShow = model<ITVShow>('TV', tvSchema);

export default TVShow;