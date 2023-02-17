import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { axiosPublic, Error } from '@/utils/axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { TLogin } from "../types/auth.types";
import Link from "next/link";

const Login = () => {
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const initVal = { email:'', password:'' };
    const { register, reset, formState: { errors }, handleSubmit } = useForm<TLogin>({defaultValues: initVal});


    const onSubmit: SubmitHandler<TLogin> = async(formVal) => {
        setErrMessage("");

        // e.preventDefault();
        /**
         * If you want to add other validation place here
        */
        try {

        }catch(e) {
            const error = err as AxiosError<Error>;
            setErrMessage(error?.response?.data.message!)
        }

        console.log(formVal);
    }
    
    return ( 
        <section className="mt-10">
            <h1 className="text-2xl md:text-4xl text-center font-semibold">Login</h1>
            <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input id="email" type="text" {...register("email", { required: "Email is required" })} className="py-2 px-3 rounded-full w-full border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder="Email" />
                    { errors.email && <span className="text-sm text-red-600 ml-2">{errors.email.message}</span> }
                </div>
                <div className="mb-3">
                    <input id="password" type="password" {...register("password", { required: "Password is required" })} className="py-2 px-3 rounded-full w-full border border-gray-200 focus:border-gray-400 focus:outline-none" placeholder="Password" />
                    { errors.password && <span className="text-sm text-red-600 ml-2">{errors.password.message}</span> }
                </div>
                <div className="text-right mb-4">
                    <a href="#" className="text-sm hover:underline">Forgot your password?</a>
                </div>
                <div>
                    <button type="submit" className="button bg-primary w-full py-2 rounded-full text-white">Login</button>
                </div>
            </form>
            <div className="flex items-center justify-center my-2 gap-1">
                <p className="text-sm ml-2">Don&apos;t have account yet?</p>
                <Link href="/signup" className="text-xs md:text-sm hover:underline">Signup Now</Link>
            </div>
        </section>
    );
}

export default Login;