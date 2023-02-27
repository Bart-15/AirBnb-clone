import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from "@/context/authContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { TFormPlaceInput } from '@/types/forms.types';
import { axiosPrivate } from '@/utils/axios';

const initVal = {
    title:'',
    address:'',
    checkIn:'',
    checkOut:'',
    maxGuests:'',
    extraInfo:'',
    price:''
}

const AddPlace = () => {
    const router = useRouter();

    const [fileImage, setFileImage] = useState<File | null | any>(null);
    
    const { ready, authUser, setAuthUser } = useContext(AuthContext);
    
    const { register, reset, formState: { errors }, handleSubmit } = useForm<TFormPlaceInput>({defaultValues: initVal});
    
    
    if(!ready) {
        return (<p className="text-center mt-20">Loading ...</p>)
    }
    
    if(ready && !authUser) router.push('/login')
    
    const onSubmit: SubmitHandler<TFormPlaceInput> = async(formVal) => {
        
        // e.preventDefault();
        /**
         * If you want to add other validation place here
        */

        const photos: any = ['sample', 'hello'];
        if(!fileImage) {
            return alert('thumbnail is required')
        }

        let formData = new FormData();

        /**
         * address
            : 
            "asdas"
            checkIn
            : 
            "08:30"
            checkOut
            : 
            "10:30"
            maxGuests
            : 
            "1"
            price
            : 
            "1"
            title
            : 
            "asdasd"
                    */
        formData.append("title", formVal.title);
        formData.append("photos", photos);
        formData.append('thumbnail', fileImage);
        formData.append('extraInfo', formVal.extraInfo);
        formData.append("address", formVal.address);
        formData.append("checkIn", formVal.checkIn);
        formData.append("checkOut", formVal.address);
        formData.append("price", formVal.price);
        formData.append("maxGuests", formVal.maxGuests);

        console.log(formData);
        console.log(formVal);

        try {
            const res = await axiosPrivate.post('/place', formData);
            console.log(res);
        } catch (e) {
            console.log(e)
        }
    }
    
    console.log(fileImage)
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
                    <div>
                        <div className="w-full group mb-6">
                                <label htmlFor="ExtraInfo" className="font-medium text-sm md:text-lg">ExtraInfo</label>
                                <input type="text" id="extraInfo" {...register("extraInfo", { required: "ExtraInfo is required" })} className="py-2 px-3 rounded-md w-full border border-gray-200 focus:border-gray-400 focus:outline-none mt-1" placeholder="ExtraInfo"/>
                                { errors.extraInfo && <span className="text-sm text-red-600 ml-2">{errors.extraInfo.message}</span> }
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="Photos" className="font-medium text-sm md:text-lg">Photos</label>
                        <div className="flex flex-row gap-4 mt-1">
                            <input type="text" id="photos" className="py-2 px-3 rounded-md border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder='Add using a link' />
                            <button className="bg-gray-200 text-gray-800 rounded-full text-xs w-32 font-medium">Add photo</button>
                        </div>
                    </div>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 md:gap-6">
                        <div>
                            <label htmlFor="checkIn" className="font-medium text-sm md:text-lg -mb-1">Check in time</label>
                            <input {...register("checkIn", { required: "Check in time is required" })} type="time" id="checkIn" className="w-full py-2 px-3 rounded-md border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder='Checkin' />
                            { errors.checkIn && <span className="text-sm text-red-600 ml-2">{errors.checkIn.message}</span> }
                        </div>
                        <div>
                            <label htmlFor="checkOut" className="font-medium text-sm md:text-lg -mb-1">Check out time</label>
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
                        <div>
                            <label htmlFor="price" className="font-medium text-sm md:text-lg -mb-1">Thumbnail</label>
                            <input type="file" className="w-full py-2 px-3 rounded-md border border-gray-200 focus:border-gray-400 focus:outline-none" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileImage(e.target.files)}/>
                        </div>
                    </div>
                    <button type="submit" className="primary my-4">Save</button>
                </form>
            </div>
        </section>
    );
}

export default AddPlace;