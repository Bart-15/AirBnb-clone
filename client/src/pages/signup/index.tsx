import { useState } from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { axiosPublic, Error } from '@/utils/axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { TSignup } from "../types/auth.types";

const SignUp = () => {
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [isSuccess, setSuccess] = useState<boolean>(false);

    const initVal = { name: '', email:'', password:'' };
    const { register, reset, formState: { errors }, handleSubmit } = useForm<TSignup>({defaultValues: initVal});


    const onSubmit: SubmitHandler<TSignup> = async(formVal) => {
        setErrMessage("");
        try {
            const { data: {success} } = await axiosPublic.post('/signup', formVal);
            if(success) {
                reset();
                setSuccess(true);
                setErrMessage("")
            }
        }catch(err) {
            const error = err as AxiosError<Error>;
            setErrMessage(error?.response?.data.message!)
        }
    }

    return ( 
        <section className="mt-10">
            <h1 className="text-2xl md:text-4xl text-center font-semibold">{isSuccess ? 'Account Creation Successful' : 'Signup'}</h1>
            {
                isSuccess ? (
                    <div className="text-center mt-5">
                        <p className="text-sm md:text-base mb-2">Your account is ready to go. Now you can log in!</p>
                        <Link href="/login" className="hover:underline text-xs md:text-sm">Go to login</Link>
                    </div> 
                )
                : (
                    <div>
                        <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <input id="name" type="text" {...register("name", { required: "Name is required" })} className="py-2 px-3 rounded-full w-full border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder="Name" />
                                { errors.name && <span className="text-sm text-red-600 ml-2">{errors.name.message}</span> }
                            </div>
                            <div className="mb-3">
                                <input id="email" type="text" onFocus={() => setErrMessage(null)} {...register("email", { required: "Email is required" })} className="py-2 px-3 rounded-full w-full border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder="Email" />
                                { errors.email ? <span className="text-sm text-red-600 ml-2">{errors.email.message}</span> :  errMessage ? (<span className="text-xs text-red-600 ml-2">{ errMessage }</span>) : '' }
                            </div>
                            <div className="mb-4">
                                <input id="password" type="password" {...register("password", { required: "Password is required" })} className="py-2 px-3 rounded-full w-full border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder="Password" />
                                { errors.password && <span className="text-sm text-red-600 ml-2">{errors.password.message}</span> }
                            </div>
                            <div>
                                <button type="submit" className="button bg-primary w-full py-2 rounded-full text-white">Signup</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center my-2 gap-1">
                            <p className="text-sm ml-2">Already have an account?</p>
                            <Link href="/login" className="text-xs md:text-sm hover:underline">Login Now</Link>
                        </div>
                    </div>
                )
            }
        </section>
    );
}

export default SignUp;