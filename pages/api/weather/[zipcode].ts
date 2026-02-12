import type { NextApiRequest, NextApiResponse } from 'next';
import { findByZip } from '../../../mongoose/weather/services';
import dbConnect from '@/middleware/db-connect';
import { WeatherInterface } from '../../../mongoose/weather/interface';
dbConnect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<NextApiResponse<WeatherInterface> | void> {
    const data = await findByZip(req.query.zipcode as string);
    return res.status(200).json(data);
}
