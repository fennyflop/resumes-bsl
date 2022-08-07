// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import url from 'url';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { TUser } from '../../utils/types';

type TResponse = {
  data?: any;
  user?: TUser | null;
}

const DAOSMITH_ROLE_ID = '956637149254533180';
const BLOCKSMITH_LABS_ID = '940349390038655048';

export default async function handler(req: NextApiRequest,res: NextApiResponse<TResponse>) {
  const { code } = req.query;

  if (code) {
    try {
      // @ts-ignore
      const formData = new url.URLSearchParams({
        code: code.toString(),
        'grant_type': 'authorization_code',
        'client_id': process.env.CLIENT_ID,
        'redirect_uri': 'https://resumes-bsl.vercel.app/',
        'client_secret': process.env.CLIENT_SECRET,
      });
      
      const {data: user} = await axios.post('https://discord.com/api/oauth2/token', formData.toString(), {headers: {'Content-Type': 'application/x-www-form-urlencoded',}});
       
      res.status(200).send({user})
    } catch (err: any) {
      res.status(401).send(err.response.data);
    }
  }
}

