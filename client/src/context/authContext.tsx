import { createContext, useEffect, useState,} from 'react';
import { AxiosError } from 'axios';
import { axiosPrivate } from '@/utils/axios';
import { useRouter } from 'next/router';
import { TLogin, TUser, TAuthContext } from '@/types/auth.types';

export const AuthContext = createContext<TAuthContext>({
    authUser:null,
    setAuthUser: () => {},
    errMessage: null, 
    ready:false,
    logout: async() => {},
    login: async() => {}
});

const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();


    const [authUser, setAuthUser] = useState<Partial<TUser> | null>(null)
    const [errMessage, setErrMessage] = useState<string | null>(null);
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

    const login = async(input:TLogin) => {
        errMessage && setErrMessage("");

        try {
            const {data: { success, payload } } = await axiosPrivate.post('/login', input);
            if(success){
                setAuthUser(payload);
                router.push('/');
            } 
        }catch(err) {
            const error = err as AxiosError<Error>;
            setErrMessage(error?.response?.data.message as string);
            setTimeout(() => setErrMessage(""),1000);
        }
    }

    const logout = async() => {
        const { data: { success } } = await axiosPrivate.post('/logout');
        if(success) {
            setAuthUser(null!);
            router.push('/login');
        }
    }

    const value = {
        authUser,
        setAuthUser, 
        ready, 
        errMessage,
        login, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
