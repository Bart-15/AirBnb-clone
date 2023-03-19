import { useQuery } from "react-query";
import { useRouter } from 'next/router';
import { fetchPlace } from '@/queries/place.queries';
import { TFormPlaceInput as TPlace } from '@/types/forms.types';



const SinglePlace = () => {
    const router = useRouter();
    const { id } = router.query;

    const {data: place} = useQuery<TPlace, Error>(['place'], () => fetchPlace(id), {
        enabled:!!id,
        keepPreviousData:true,
        refetchOnWindowFocus:false,
    });
    

    return (
        <div className="mt-4 bg-gray-100 px-8 py-8 rounded">
            <h2 className="text-1xl md:text-2xl">{place?.title}</h2>
            <p className="my-2 block font-semibold underline">{place?.address}</p>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h3 className="font-semibold text-1xl mb-4">Description</h3>
                        <div dangerouslySetInnerHTML={{__html: place?.description!}}></div>
                    </div>
                    <div className="my-4">
                        <p>Check-in: {place?.checkIn}</p>
                        <p>Check-out: {place?.checkOut}</p>
                        <p>Max number of guests: {place?.maxGuests}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h3 className="font-semibold text-2xl">Extra info</h3>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place?.small_description}
                </div>
            </div>
        </div>
    );
}

export default SinglePlace;