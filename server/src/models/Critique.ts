import { Schema, model, Document } from 'mongoose';

interface ICritique extends Document {
    user: Schema.Types.ObjectId;
    film?: Schema.Types.ObjectId;
    show?: Schema.Types.ObjectId;
    metricScores: Schema.Types.ObjectId[];
};

const critiqueSchema = new Schema<ICritique>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        film: {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
        },
        show: {
            type: Schema.Types.ObjectId,
            ref: 'TV',
        },
        metricScores: [{
            type: Schema.Types.ObjectId,
            ref: 'Score',
        }],
    },
    {
        _id: true,
    },
);

const Critique = model<ICritique>('Critique', critiqueSchema);

export default Critique;