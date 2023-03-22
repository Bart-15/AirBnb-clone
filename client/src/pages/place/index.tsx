import {useQuery} from 'react-query';
import { TFormPlaceInput as TPlaces } from '@/types/forms.types';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPlaces } from '@/queries/place.queries';
import { addCommas } from '@/global/const';
import noImage from '../../../assets/images/no-image.png'

export default function Places() {

    const {data: places, isLoading} = useQuery<TPlaces[], Error>(['places'], () => fetchPlaces(), {
        enabled:true,
        keepPreviousData:true,
        refetchOnWindowFocus:false,
    });

    if(isLoading) return <div className="text-center mt-20"><h2>Loading...</h2></div>

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {
                places?.map(place => {
                    return (
                        <Link href={`/place/${place._id}`} key={place._id}>
                            <div className="bg-gray-500 mb-2 rounded-2xl flex">
                                <Image className="rounded-2xl object-cover aspect-square w-full" src={place.images!.length > 0 ? place.images![0] : noImage} width="100" height="100" alt="Hello"/>                                
                            </div>
                            <h2 className="font-bold">{place.address}</h2>
                            <h3 className="text-sm text-gray-500">{place.title}</h3>
                            <div className="mt-1">
                                <span className="font-bold">₱{addCommas(place.price)}</span> per night
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
