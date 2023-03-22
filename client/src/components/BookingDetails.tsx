import { FunctionComponent, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { TFormPlaceInput as TPlace, TBookingInput } from '@/types/forms.types';
import { addCommas } from '@/global/const';
import { differenceInCalendarDays } from "date-fns";
import { AuthContext } from '@/context/authContext';
import { axiosPrivate } from '@/utils/axios';

type TBookingDetails = {
    place: TPlace,
}

const initVal = {
    name:'',
    place:'',
    checkIn:'',
    checkOut:'',
    numberOfGuests:1,
    phone:'',
}

const BookingDetails:FunctionComponent<TBookingDetails> = ({
    place
    }) => {
        const router = useRouter();
        const { ready, authUser } = useContext(AuthContext);
        
        const [checkIn, setCheckIn] = useState<string>("");
        const [checkOut, setCheckOut] = useState<string>("");
        const [totalPrice, setTotalPrice] = useState<number>(0);
        const [totalNights, setTotalNights] = useState<number>(1);
        
        useEffect(() => {
            if(checkIn && checkOut) {
                let totalNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
                setTotalNights(totalNights);
                let computedPrice = totalNights * parseInt(place.price)
                setTotalPrice(computedPrice);
            }

        }, [checkIn, checkOut, place?.price]);
        
        const { register, watch, setValue, formState: { errors }, handleSubmit } = useForm<TBookingInput>({defaultValues:initVal});
        
        if(!place) {
            return null;
        };
        
        const bookNow = async(formVal: TBookingInput) => {

            if(authUser == null) {
                alert("You need to loged in first");
                router.push('/login');
                return;
            }
            
            const newBooking = { ...formVal, place:place._id, numberOfGuests: parseInt(formVal.numberOfGuests.toString()), price: totalPrice};
            try {
                const { data } = await axiosPrivate.post('/booking', newBooking);
                if(data.success) return router.push('/account/booking')
                console.log(data);
            }catch(e){
                console.log(e);
            }
        }
    
    return ( 
        <div className="bg-white h-max rounded-lg shadow-lg p-6">
            <p className="text-left font-semibold text-2xl">₱{addCommas(place?.price)} <span className="text-base font-light">night</span></p>
            <form onSubmit={handleSubmit(bookNow)}>
                <div className="grid grid-cols-2 gap-2 mt-2 mb-4">
                    <div>
                        <label htmlFor="checkIn" className="font-semibold">Checkin:</label>
                        <input type="date" id="checkIn" min={new Date().toISOString().substring(0, 10)} {...register("checkIn", { required: "Checkin is required" })} onChange={(e) => setCheckIn(e.target.value)} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1"/>
                        { (errors.checkIn && !checkIn ) && <span className="text-sm text-red-600 ml-2">{errors.checkIn.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="checkIn" className="font-semibold">Checkout:</label>
                        <input type="date" id="checkOut" min={new Date().toISOString().substring(0, 10)} {...register("checkOut", { required: "Checkout is required" })} onChange={(e) => setCheckOut(e.target.value)} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1"/>
                        { (errors.checkOut && !checkOut) && <span className="text-sm text-red-600 ml-2">{errors.checkOut.message}</span> }
                    </div>
                </div>
                <hr className="text-slate-200 mb-4"/>
                <div className="mb-4">
                    <label htmlFor="numberOfGuests" className="font-semibold">Number of guests:</label>
                    <input type="number" id="numberOfGuests" {...register("numberOfGuests", { required: "Number of guests is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Number of guest"/>
                    { errors.numberOfGuests && <span className="text-sm text-red-600 ml-2">{errors.numberOfGuests.message}</span> }
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="font-semibold">Name:</label>
                    <input type="text" id="name" {...register("name", { required: "Name is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Name"/>
                    { errors.name && <span className="text-sm text-red-600 ml-2">{errors.name.message}</span> }
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="font-semibold">Phone number:</label>
                    <input type="tel" id="phone"  {...register("phone", { required: "Phone is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Phone Number"/>
                    { errors.phone && <span className="text-sm text-red-600 ml-2">{errors.phone.message}</span> }
                </div>
                <div className="text-center">
                    <button type="submit" className="button bg-primary w-full py-2 rounded-md text-white font-semibold">Reserve</button>
                </div>
                {
                    (totalPrice && totalNights)> 0 && (
                    <div>
                        <div className="flex items-center justify-center py-4">
                            <span className="text-center font-light text-sm md:text-base">You won&apos;t be charged yet</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-light text-sm md:text-base underline">₱{addCommas(place?.price)} x {totalNights} <span> night{totalNights > 1 ? 's': null}</span></p>
                            <p className="font-light text-sm md:text-base">₱{addCommas(totalPrice)}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex items-center justify-between">
                            <p className="font-semibold md:text-base">Total before taxes</p>
                            <p className="font-light text-sm md:text-base">₱{addCommas(totalPrice)}</p>
                        </div>
                    </div>
                    )
                }
            </form>
        </div> 
    );
}

export default BookingDetails;