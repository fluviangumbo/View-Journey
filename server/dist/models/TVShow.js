import { Schema, model } from 'mongoose';
const tvSchema = new Schema({
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
}, {
    _id: false,
});
const TVShow = model('TV', tvSchema);
export default TVShow;
