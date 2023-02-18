import { useContext } from 'react';
import { useRouter } from 'next/router';
import { axiosPrivate } from '@/utils/axios';
import { AuthContext } from '@/context/authContext';
import AccountNav from "@/components/AcountNav";
const Account = () => {
    const router = useRouter();
    const { ready, authUser, setAuthUser } = useContext(AuthContext)

    
    if(!ready) {
        return (<p className="text-center mt-20">Loading ...</p>)
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
        <section className="mt-20">
            <AccountNav />
            <div className="text-center">
                <p className="mb-2">Loged in as {authUser?.name} ({authUser?.email})</p>
                <button className="bg-primary w-32 py-2 rounded-full text-white" onClick={handleLogout}>Logout</button>
            </div>
        </section>
    );
}
 
export default Account;