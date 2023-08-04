// Libraries
import { getAllUsers } from '@/lib/getData';
import axios from 'axios';
import Cookies from 'cookies';

// Types
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');
    const response: Promise<any> = await getAllUsers(token).then((res) => { return res.data });
    
    return res.status(200).json(response);
}