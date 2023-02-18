import { AuthContext } from '@/context/authContext';
import { axiosPrivate } from '@/utils/axios';
import { useRouter } from 'next/router'; 
import { useContext } from 'react';

const Profile = () => {
    const router = useRouter();
    const { authUser, setAuthUser, ready } = useContext(AuthContext);

    if(!ready) {
        return (<p>Loading ...</p>)
    }

    if(ready && !authUser) router.push('/login')

    async function handleLogout(){
        const { data: { success } } = await axiosPrivate.post('/logout');
        if(success) {
            setAuthUser(null!);
            router.push('/login');
        }
    }
    
    return ( 
        <div className="text-center max-w-xl mx-auto mt-10">
            <p>Loged in as {authUser?.name} ({authUser?.email})</p>
            <button className="button bg-primary w-full py-2 rounded-full text-white mt-2" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;