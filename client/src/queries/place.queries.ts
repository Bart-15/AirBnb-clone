import { TPerks, TFormPlaceInput as TPlace } from '@/types/forms.types';
import { axiosPrivate } from '@/utils/axios';


export async function fetchPerks(): Promise<TPerks[]> {
    const { data: { data } } = await axiosPrivate.get('/perks');
    return data;
}

export async function fetchUserPlace(): Promise<TPlace[]> {
    const { data: { places } } = await axiosPrivate.get('/user-place');
    return places;
}

export async function fetchPlace(id: string | string[] | undefined) : Promise<TPlace> {
    const { data: { place } } = await axiosPrivate.get(`/place/${id}`);
    return place;
}