import { Schema, model, Document } from 'mongoose';

export interface ITVShow extends Document {
    tmdbID: number;
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
    lastUpdated: Date;
};

const tvSchema = new Schema<ITVShow>(
    {
        tmdbID: {
            type: Number,
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
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
);

const TVShow = model<ITVShow>('TV', tvSchema);

export default TVShow;