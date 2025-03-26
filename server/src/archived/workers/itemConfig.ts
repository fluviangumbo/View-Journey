import { IMovie } from '../../models/Movie';
import { ITVShow } from '../../models/TVShow';
import { IPerson } from '../../models/Person';
import { Movie, TVShow, Person } from '../../models/index';
import { Model, Document } from 'mongoose';

interface ItemConfig<T extends Document> {
    model: Model<T>;
    endpoint: string;
}

const itemConfigs: Record<string, ItemConfig<any>> = {
    movies: { model: Movie, endpoint: 'movie' } as ItemConfig<IMovie>,
    tvShows: { model: TVShow, endpoint: 'tv' } as ItemConfig<ITVShow>,
    people: { model: Person, endpoint: 'person' } as ItemConfig<IPerson>
} as const;

export default itemConfigs;