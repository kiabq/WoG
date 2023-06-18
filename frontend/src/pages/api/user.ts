import axios from 'axios';
import Cookies from 'cookies';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');
    const body = req.body;
    const config = {
        Authorization: `Bearer ${token}`
    };

    await axios.put(`${process.env.REACT_APP_BACKEND}/api/users/me/update`,
        body,
        { headers: config }
    ).then((response) => {
        if (response.status !== 200) {
            return res.status(response.status).json('Something went wrong.');
        }

        return res.status(200).json(response.data);
    }).catch((e) => {
        // Do something idk
        res.status(400);
    })

}