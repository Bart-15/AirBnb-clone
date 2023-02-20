import { useContext } from "react";
import Link from "next/link";
import AccountNav from "@/components/AcountNav";
import { useRouter } from 'next/router';
import { AuthContext } from "@/context/authContext";


const Places = () => {

    const router = useRouter();
    const { ready, authUser, setAuthUser } = useContext(AuthContext)

    if(!ready) {
        return (<p className="text-center mt-20">Loading ...</p>)
    }

    if(ready && !authUser) router.push('/login')

    return ( 
        <div className="mt-20">
            <AccountNav />
            <div className="text-center">
                <Link href="/account/places/add" className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new place
                </Link>
            </div>
        </div>
    );
}

export default Places;