import Link from 'next/link';
import { useRouter } from 'next/router';


const AccountNav = () => {
    const router = useRouter();

    let subPage = router.pathname.split("/")[2]
    if(subPage === undefined) subPage = 'profile';

    function linkClasses(type?: string){
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
        type === subPage ? classes += ' bg-primary text-white' : classes += ' bg-gray-200';
        return classes;
    }

    return ( 
        <nav className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 mb-8">
            <Link href="/account" className={linkClasses('profile')}>My Account</Link>
            <Link href="/account/bookings" className={linkClasses('bookings')}>My Bookings</Link>
            <Link href="/account/places" className={linkClasses('places')}>My Accomodations</Link>
        </nav>
    );
}

export default AccountNav;