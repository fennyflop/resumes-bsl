import url from 'url';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const { code } = req.query;
    if (code) {
        try {
            // @ts-ignore
            const formData = new url.URLSearchParams({
                'token': code.toString(),
                'client_id': process.env.CLIENT_ID,
                'client_secret': process.env.CLIENT_SECRET,
            });
            console.log(formData.toString());
            const response = await axios.post('https://discord.com/api/oauth2/token/revoke', formData.toString(), {headers: {'Content-Type': 'application/x-www-form-urlencoded',}});
            res.status(200).send(response);
        } catch (error) {
            res.status(401).send(error);
        }
    }
}
