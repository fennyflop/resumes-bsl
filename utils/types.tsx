export type TUser = {
    "access_token": string,
    "token_type": "Bearer" | "Bot",
    "expires_in": number,
    "refresh_token": string,
    "scope": string;
    "authorized"?: boolean;
}

export type TUserData = {
    id: string;
    username: string;
    avatar: string;
    access_token: string;
    authorized: boolean;
}

export type TUserContext = {
    user: TUserData;
    setUser: (user: TUserData) => void; 
}

export type TDiscordUser = {
    accent_color: number;
    avatar: string;
    avatar_decoration: any;
    banner: any;
    banner_color: string;
    discriminator: string;
    flags: any;
    id: string;
    locale: string;
    mfa_enabled: boolean;
    public_flags: any;
    username: string;
}