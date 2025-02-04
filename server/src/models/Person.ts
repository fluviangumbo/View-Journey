import { Schema, model, Document } from 'mongoose';

// do we need a role or department? how should we list the people's credits specifically
interface ICredit extends Document {
    referenceId: number;
    modelType: 'Movie' | 'TV';
    roleType: string;
    role: string;
};

const creditSchema = new Schema<ICredit>(
    {
        referenceId: {
            type: Number,
            required: true,
            unique: false,
        },
        modelType: {
            type: String,
            required: true,
            enum: ['Movie', 'TV'],
        },
        roleType: {
            type: String,
            required: true,
            unique: false,
        },
        role: {
            type: String,
            required: true,
            unique: false,
        },
    },
    {
        _id: false,
    },
);

export interface IPerson extends Document {
    tmdbID: number;
    name: string;
    gender: number;
    primaryRole: string;
    credits: ICredit[];
};

const personSchema = new Schema<IPerson>(
    {
        tmdbID: {
            type: Number,
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
    },
    {
        _id: true,
    },
);

const Person = model<IPerson>('Person', personSchema);

export default Person;