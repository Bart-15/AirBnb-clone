import { axiosPrivate } from '@/utils/axios';
import { IBooking } from '@/types/forms.types';

export async function fetchUserBookings(): Promise<IBooking[]> {
    const { data: { bookings } } = await axiosPrivate.get('/booking');
    return bookings;
}   
