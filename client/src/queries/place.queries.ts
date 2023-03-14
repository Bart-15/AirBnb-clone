import { TPerks } from '@/types/forms.types';
import { axiosPrivate } from '@/utils/axios';


export async function fetchPerks(): Promise<TPerks[]> {
    const { data } = await axiosPrivate.get('/perks');
    return data.data;
}