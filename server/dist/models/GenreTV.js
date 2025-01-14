import { Schema, model } from 'mongoose';
const genreTVSchema = new Schema({
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
}, {
    _id: false,
});
const GenreTV = model('Genre, TV', genreTVSchema);
export default GenreTV;
