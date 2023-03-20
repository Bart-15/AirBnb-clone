import { FunctionComponent, useState } from 'react';
import { useForm } from "react-hook-form";
import { TFormPlaceInput as TPlace, TBookingInput } from '@/types/forms.types';
import { addCommas } from '@/global/const';
import { axiosPrivate } from '@/utils/axios';

type TBookingDetails = {
    place?: TPlace
}

const initVal = {
    fullName:'',
    place:'',
    checkIn:'',
    checkOut:'',
    numberOfGuests:null,
    phone:'',
    price:0,
}

const BookingDetails:FunctionComponent<TBookingDetails> = ({
    place
    }) => {
    
    const { register, watch, setValue, formState: { errors }, handleSubmit } = useForm<TBookingInput>({defaultValues:initVal});
    
    if(!place) {
        return null;
    };


    const onSubmit = async(formVal: TBookingInput) => {
        

        // try {
        //     const { data } = await axiosPrivate.post('/place', newData);
        //     // if(data.success) return router.push('/account/place')
        // }catch(e){
        //     console.log(e);
        // }
    }
    return ( 
        <div className="bg-white h-max rounded-lg shadow-lg p-4">
            <p className="text-center font-semibold">₱{addCommas(place?.price)} / per night</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2  gap-2 mt-2 mb-4">
                    <div>
                        <label htmlFor="checkIn" className="font-semibold">Checkin:</label>
                        <input type="date" id="checkIn" {...register("checkIn", { required: "Checkin is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1"/>
                        { errors.checkIn && <span className="text-sm text-red-600 ml-2">{errors.checkIn.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="checkIn" className="font-semibold">Checkout:</label>
                        <input type="date" id="checkOut" {...register("checkOut", { required: "Checkout is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1"/>
                        { errors.checkOut && <span className="text-sm text-red-600 ml-2">{errors.checkOut.message}</span> }
                    </div>
                </div>
                <hr className="text-slate-200 mb-4"/>
                <div className="mb-4">
                    <label htmlFor="numberOfGuests" className="font-semibold">Number of guests:</label>
                    <input type="number" id="numberOfGuests" {...register("numberOfGuests", { required: "Number of guests is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Number of guest"/>
                    { errors.numberOfGuests && <span className="text-sm text-red-600 ml-2">{errors.numberOfGuests.message}</span> }
                </div>
                <div className="mb-4">
                    <label htmlFor="fullName" className="font-semibold">Full name:</label>
                    <input type="text" id="fullName" {...register("fullName", { required: "Fullname is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Full name"/>
                    { errors.fullName && <span className="text-sm text-red-600 ml-2">{errors.fullName.message}</span> }
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="font-semibold">Phone number:</label>
                    <input type="tel" id="phone"  {...register("phone", { required: "Phone is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Full name"/>
                    { errors.phone && <span className="text-sm text-red-600 ml-2">{errors.phone.message}</span> }
                </div>
                <div className="text-center">
                    <button type="submit" className="button bg-primary w-full py-2 rounded-full text-white">Book now</button>
                </div>
            </form>
        </div> 
    );
}

export default BookingDetails;