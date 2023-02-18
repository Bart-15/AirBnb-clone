import { createContext, useEffect, useState,} from 'react';
import { AxiosError } from 'axios';
import { axiosPrivate } from '@/utils/axios';
 

type TUser = {
    _id: string;
    name: string;
    email: string;
}

type TAuthContent = {
    authUser: Partial<TUser> | null;
    setAuthUser: (auth: TUser) => void,
    ready: boolean;
}

export const AuthContext = createContext<TAuthContent>({
    authUser:null,
    setAuthUser: () => {}, 
    ready:false
});

const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [authUser, setAuthUser] = useState<Partial<TUser> | null>(null)
    const [ready, setReady] = useState<boolean>(false);
    
    useEffect(() => {

        async function getProfile(){
            try {
                    const {data} = await axiosPrivate('/profile');
                    setAuthUser(data.user);
                    setReady(true);
            }catch(err){
                const error = err as AxiosError<Error>;
                setAuthUser(null);
                setReady(true)
            }
        }

        getProfile();
    },[])

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, ready }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
