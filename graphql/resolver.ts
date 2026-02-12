import { WeatherInterface } from '@/mongoose/weather/interface';
import { findByZip, updateByZip } from '@/mongoose/weather/services';

export const resolvers = {
    Query: {
        weather: async (_: unknown, param: WeatherInterface) => {
            const localWeatherData = await findByZip(param.zip);
            console.log(localWeatherData);

            if (!localWeatherData) return [];

            const friendsWeatherData = localWeatherData.friends.map(
                async (friendZip) => await findByZip(friendZip),
            );

            return [localWeatherData, ...friendsWeatherData];
            // return [db.find((item) => item.zip === param.zip)];
        },
    },
    Mutation: {
        weather: async (_: unknown, param: { data: WeatherInterface }) => {
            await updateByZip(param.data.zip, param.data);
            return [await findByZip(param.data.zip)];
        },
    },
};
