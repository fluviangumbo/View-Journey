import { Schema, model, Document } from 'mongoose';

interface IScore extends Document {
    critique: Schema.Types.ObjectId;
    referenceMetric: Schema.Types.ObjectId;
    scoreNum?: number;
    scoreAlt?: string;
    rubric: string;
};

const scoreSchema = new Schema<IScore>(
    {
        critique: {
            type: Schema.Types.ObjectId,
            ref: 'Critique',
            required: true,
        },
        referenceMetric: {
            type: Schema.Types.ObjectId,
            ref: 'Metric',
            required: true,
        },
        scoreNum: {
            type: Number,
        },
        scoreAlt: {
            type: String,
        },
        rubric: {
            type: String,
        },
    },
    {
        _id: false,
    },
);

const Score = model<IScore>('Score', scoreSchema);

export default Score;