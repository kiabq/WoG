import axios from 'axios';
import Cookies from 'cookies';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token')
    const body = req.body;
    const config = {
        Authorization: `Bearer ${token}`
    }
    const category = Object.keys(body)[0];
    
    await axios.put('http://localhost:1337/api/users/me/update',
        body,
        { headers: config }
    ).then((response) => {
        if (response.status !== 200) {
            return res.status(response.status).json('Something went wrong.');
        }

        switch (category) {
            case 'optionalQuestions':
                return res.status(200).json(response.data.optionalQuestions);
            case 'user_info':
                return res.status(200).json(response.data.user_info);
            case 'sunday':
                return res.status(200).json(response.data)
            default:
                res.status(400);
        }
    }).catch((e) => {
        res.status(400);
    })

}