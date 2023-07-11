// Libraries
import Cookies from 'cookies'

// Types
import type { NextApiRequest, NextApiResponse } from 'next';

export async function getAuthHeader(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    return token;
}