import mongoose, { model } from 'mongoose';
import { WeatherInterface } from './interface';
import { WeatherScema } from './schema';

export default mongoose.models.Weather ||
    model<WeatherInterface>('Weather', WeatherScema);
