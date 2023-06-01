export type TLogin = {
    email: string;
    password: string;
}

export type TSignup = {
    name:string;
    email: string;
    password: string;
}

export type TUser = {
    _id: string;
    name: string;
    email: string;
}

export type TAuthContext = {
    authUser: Partial<TUser> | null;
    setAuthUser: (auth: TUser) => void,
    ready: boolean;
    errMessage: string | null;
    logout: () =>  Promise<void>;
    login: (input: TLogin) => Promise<void>;
}