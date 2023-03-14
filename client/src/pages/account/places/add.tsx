import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from "@/context/authContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { TFormPlaceInput, TPerks } from '@/types/forms.types';
import { axiosPrivate } from '@/utils/axios';
import { fetchPerks } from '@/queries/place.queries';
import { useQuery } from 'react-query';
import MultiCheckBox from '@/components/MultiCheckbox';

const initVal = {
    title:'',
    address:'',
    checkIn:'',
    checkOut:'',
    maxGuests:'',
    small_description:'',
    description:'',
    price:''
}

const AddPlace = () => {
    const router = useRouter();

    const [ selectedPerks, setSelectedPerks ] = useState<string[]>([])
    
    const { ready, authUser } = useContext(AuthContext);
    
    const { register, reset, formState: { errors }, handleSubmit } = useForm<TFormPlaceInput>({defaultValues: initVal});
    
    const { data: perksOptions } = useQuery<TPerks[], Error>(["perks"], () => fetchPerks(), {
        enabled:!!authUser,
        keepPreviousData:true,
        refetchOnWindowFocus:false,
    })
    
    if(!ready) {
        return (<p className="text-center mt-20">Loading ...</p>)
    }
    
    if(ready && !authUser) return router.push('/login')
    

    const onSubmit: SubmitHandler<TFormPlaceInput> = async(formVal) => {
        
        let newData = { ...formVal, perks:selectedPerks, maxGuests: parseInt(formVal.maxGuests), price: parseInt(formVal.price) }

        try {
            const { data } = await axiosPrivate.post('/place', newData);
            if(data.success) return router.push('/account/places')
        }catch(e){
            console.log(e);
        }
    }
    
    return ( 
        <section>
            <button className="bg-primary py-2 px-6 rounded-full text-white my-10 text-xs md:text-base inline-flex gap-2" onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Go back
            </button>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="w-full group mb-6">
                            <label htmlFor="Title" className="font-medium text-sm md:text-lg">Title</label>
                            <input type="text" id="title" {...register("title", { required: "Title is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder='Title' />
                            { errors.title && <span className="text-sm text-red-600 ml-2">{errors.title.message}</span> }
                        </div>
                        <div className="w-full group mb-6">
                            <label htmlFor="Address" className="font-medium text-sm md:text-lg">Address</label>
                            <input type="text" id="address" {...register("address", { required: "Address is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Address"/>
                            { errors.address && <span className="text-sm text-red-600 ml-2">{errors.address.message}</span> }
                        </div>
                    </div>
                    <div className="w-full group mb-6">
                        <label htmlFor="Small_description" className="font-medium text-sm md:text-lg">Small Description</label>
                        <input type="text" id="small_description" {...register("small_description", { required: "Small_description is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Small Description"/>
                        { errors.small_description && <span className="text-sm text-red-600 ml-2">{errors.small_description.message}</span> }
                    </div>
                    <div className="w-full group mb-6">
                        <label htmlFor="Description" className="font-medium text-sm md:text-lg">Description</label>
                        <textarea rows={4} id="description" {...register("description", { required: "Description is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="Description"/>
                        { errors.description && <span className="text-sm text-red-600 ml-2">{errors.description.message}</span> }
                    </div>
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
                        <MultiCheckBox options={perksOptions as TPerks[]} selected={selectedPerks} onChange={setSelectedPerks}/>
                    </div>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 md:gap-6">
                        <div>
                            <label htmlFor="checkIn" className="font-medium text-sm md:text-lg -mb-1">Check in</label>
                            <input {...register("checkIn", { required: "Check in is required" })} type="time" id="checkIn" className="w-full py-2 px-3 rounded-md border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder='Checkin' />
                            { errors.checkIn && <span className="text-sm text-red-600 ml-2">{errors.checkIn.message}</span> }
                        </div>
                        <div>
                            <label htmlFor="checkOut" className="font-medium text-sm md:text-lg -mb-1">Check out</label>
                            <input type="time" {...register("checkOut", { required: "Check out time is required" })} id="checkOut" className="w-full py-2 px-3 rounded-md border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder='Checkout' />
                            { errors.checkOut && <span className="text-sm text-red-600 ml-2">{errors.checkOut.message}</span> }
                        </div>
                        <div>
                            <label htmlFor="maxGuests" className="font-medium text-sm md:text-lg -mb-1">Max number of guests</label>
                            <input type="text" {...register("maxGuests", { required: "Max guests is required", pattern: { value: /^[1-9]+$/, message: 'Please enter a valid price'} })} id="maxGuests" className="w-full py-2 px-3 rounded-md border border-gray-200 focus:border-gray-400 focus:outline-none" />
                            { errors.maxGuests && <span className="text-sm text-red-600 ml-2">{errors.maxGuests.message}</span> }
                        </div>
                        <div>
                            <label htmlFor="price" className="font-medium text-sm md:text-lg -mb-1">Price</label>
                            <input type="text" {...register("price", { required: "Price is required", pattern: { value: /^[1-9]+$/, message: 'Please enter a valid price'}} )} id="price" className="w-full py-2 px-3 rounded-md border border-gray-200 focus:border-gray-400 focus:outline-none" />
                            { errors.price && <span className="text-sm text-red-600 ml-2">{errors.price.message}</span> }
                        </div>
                    </div>
                    <button type="submit" className="primary my-4">Save</button>
                </form>
            </div>
        </section>
    );
}

export default AddPlace;