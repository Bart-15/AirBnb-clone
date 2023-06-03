import { useContext, useState } from 'react';
import { useQuery, useMutation, UseMutationResult, useQueryClient } from 'react-query';
import AccountNav from "@/components/AcountNav";
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';
import { IBooking } from '@/types/forms.types';
import { fetchUserBookings } from '@/queries/booking.queries';
import { axiosPrivate } from '@/utils/axios';
import { AxiosError } from 'axios';

const deletePlace = async(id:string): Promise<void> => {
    const res = await axiosPrivate.delete(`/booking/${id}`);

    if(res.data.success) {
        return res.data;
    }

    throw new Error("Error delete Place")
}

const Bookings = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { ready, authUser } = useContext(AuthContext);
    
    const { data: bookings } = useQuery<IBooking[], Error>(["bookings"], () => fetchUserBookings(), {
        enabled:!!authUser,
        keepPreviousData:true,
        refetchOnWindowFocus:false,
    })

    const mutation: UseMutationResult<void, Error, string> = useMutation<void, Error, string>(deletePlace, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('bookings');
        },
        onError:(error:Error) => {
            return console.log(error);
        },
    })

    if(!ready) {
        return (<p className="text-center mt-20">Loading ...</p>)
    }

    if(ready && !authUser) router.push('/login')

    const deleteBooking = async (id: string) => await mutation.mutateAsync(id)

    return ( 
        <div className="mt-20">
            <AccountNav />
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
                    {
                        bookings?.length! > 0 ? bookings?.map((booking) => {
                            return(
                                <tr key={booking._id} className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {booking.place.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {booking.place.address}
                                    </td>
                                    <td>
                                        <button className="bg-transparent py-2 text-primary" onClick={() => deleteBooking(booking._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : (<tr><td className="px-6 py-3">No Bookings as of the moment.</td></tr>)
                    }
            </table>
        </div>
    );
}
 
export default Bookings;