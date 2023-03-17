import { useContext, useState } from "react";
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { TFormPlaceInput as TPlace } from "@/types/forms.types";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import AccountNav from "@/components/AcountNav";
import { fetchUserPlace } from "@/queries/place.queries";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import UploadPhotos from "@/components/UploadPhotos";


const Places = () => {

    const router = useRouter();
    const { ready, authUser } = useContext(AuthContext);
    const { isShown, toggle } = useModal();
    const [placeId, setPlaceId] = useState<string>("");

    const { data: places, refetch } = useQuery<TPlace[], Error>(["places"], () => fetchUserPlace(), {
        enabled:!!authUser,
        keepPreviousData:true,
        refetchOnWindowFocus:false,
    })

    if(!ready) {
        return (<p className="text-center mt-20">Loading ...</p>)
    }

    if(ready && !authUser) router.push('/login')

    async function handleDelete(id:string) {
        console.log(id)
    }


    function handleToggle(id:string){
        toggle();
        setPlaceId(id)
    }


    return ( 
        <div className="mt-20">
            <AccountNav />
            <div className="text-left">
                <Link href="/account/place/add" className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new place
                </Link>
            </div>
            <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">
                                Place
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-r-lg">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            places?.map((place) => {
                                return (
                                    <tr key={place._id} className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {place.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {place.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <button  onClick={() => handleToggle(place._id!)} className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                    </svg>
                                                    Gallery
                                                </button>
                                                <Link href={`/account/place/${place._id}`} className="bg-transparent text-green-600 py-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button className="bg-transparent py-2 text-primary" onClick={toggle}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Modal isShown={isShown} header="Add more photos" hide={toggle} modalContent={<UploadPhotos id={placeId} hide={toggle}/>}/>
        </div>
    );
}


export default Places;