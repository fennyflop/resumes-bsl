
import { createContext } from 'react';
import { TUserContext } from '../utils/types';

export const UserContext = createContext<TUserContext>({user: {username: '', avatar: '', access_token: '', authorized: false, id: ''}, setUser: () => {}});