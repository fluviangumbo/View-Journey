import { Schema, model } from 'mongoose';
const creditSchema = new Schema({
    referenceId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
    },
    modelType: {
        type: String,
        required: true,
        enum: ['Movie', 'TV'],
    },
    role: {
        type: String,
        required: true,
        unique: false,
    },
});
const personSchema = new Schema({
    tmdbID: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    gender: {
        type: Number,
        required: true,
        unique: false,
    },
    primaryRole: {
        type: String,
        unique: false,
        required: false,
    },
    credits: [creditSchema],
}, {
    _id: false,
});
const Person = model('Person', personSchema);
export default Person;
