import Cookies from 'cookies'
import type { NextApiRequest, NextApiResponse } from 'next';

export function getAuthHeader(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    return token;
}