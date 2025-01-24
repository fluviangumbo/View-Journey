import { Schema, model, Document } from 'mongoose';

interface IMetric extends Document {
    name: string;
    description: string;
    // scores: Schema.Types.ObjectId[];
    subMetrics?: Schema.Types.ObjectId[];
    createdBy: Schema.Types.ObjectId;
};

const metricSchema = new Schema<IMetric>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        // scores: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'Score',
        // }],
        subMetrics: [{
            type: Schema.Types.ObjectId,
            ref: 'Metric',
            required: false,
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        _id: true,
    },
); // Could add a setter here that tells if it's a meta-metric?
// Also looking into discriminators for a template metric?
// BIG CHANGE: separate scores and metrics into two separate models?could havfe metric be the template and then score be a score and the ID of the movie/show, and id of the metric, then critique would only need a reference for scores, which could populate the metric template?

//DID THE CHANGE, don't think we need scores tied to this model at all

const Metric = model<IMetric>('Metric', metricSchema);

export default Metric;