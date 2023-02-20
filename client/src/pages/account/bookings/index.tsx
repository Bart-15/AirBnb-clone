import { useContext } from 'react'
import AccountNav from "@/components/AcountNav";
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';

const Bookings = () => {
    const router = useRouter();
    const { ready, authUser, setAuthUser } = useContext(AuthContext)

    if(!ready) {
        return (<p className="text-center mt-20">Loading ...</p>)
    }

    if(ready && !authUser) router.push('/login')

    return ( 
        <div className="mt-20">
            <AccountNav />
            Bookings
        </div>
    );
}
 
export default Bookings;