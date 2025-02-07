import { Schema, model, Document } from 'mongoose';

interface ITracker extends Document {
    dataType: string;
    lastTrackedLog: string[];
    lastUpdated: Date;
}

const trackerSchema = new Schema<ITracker>(
    {
        dataType: {
            type: String,
            unique: true,
        },
        lastTrackedLog: {
            type: [String], // Have to add ${Date.now} to the logs
            default: [],
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    },
);

const Tracker = model<ITracker>('Tracker', trackerSchema);

async function initializeTrackers() {
    const dataTypes = ['movies', 'tvShows', 'people', 'newData'];

    const trackerEntries = await Promise.all(
        dataTypes.map(async (dataType) => {
            const tracker = await Tracker.findOneAndUpdate(
                { dataType },
                { $setOnInsert: { lastTrackedLog: [], lastUpdated: new Date() } }, // Only set if inserting
                { upsert: true, new: true }
            );
            return [dataType, tracker];
        })
    );

    return Object.fromEntries(trackerEntries);
}

const trackers = await initializeTrackers();

export default trackers;

// SEE NOT ON API WORKERS, this will be refactored