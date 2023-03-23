import { useState } from 'react';
import { axiosPrivate } from "@/utils/axios";
import Image from 'next/image';

type FileObj = {
    id:string;
    file:File;
}

const UploadPhotos = (props: {id:string, hide: () => void; existingImgs?: string[]}) => {
    const [images, setImages] = useState<FileObj[]>([]);
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        let fileList = event.target.files;

        const newFiles = Array.from(fileList!).map((file) => (
            {id:Math.random().toString(36).substring(7), file}
        ))

        setImages([...images, ...newFiles]);
    }
    
    async function uploadImages(event: any){
        if(images.length < 3) {
            alert("Please select atleast 3 images")
            return;
        }
        
        try {
            const formData = new FormData();

            for(let i = 0; i < images!.length; i++){
                let file = images![i].file;
                formData.append('images', file);
            }
            const { data } = await axiosPrivate.patch(`/upload-images/${props.id}`, formData);
            if(data.success) return props.hide();
        }catch(e){
            console.log(e);
        }
    }
    
    function handleRemove(id: string) {
        setImages(images.filter((img) => img.id !== id));
    }   
    
    return ( 
        <div>
            <div>
                <div>
                    <input type="file" className="w-24 text-sm" multiple onChange={handleChange} />
                </div>
                <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        images?.length! > 0 && images?.map((img) => {
                            return (
                                <div className="h-32 flex relative" key={img.id}>
                                    <Image className="w-full object-cover rounded-md" src={URL.createObjectURL(img.file)} width="200" height="200" alt="hello" />
                                    <button className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3" onClick={() => handleRemove(img.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>  
                <button className="bg-primary py-2 px-6 rounded-full text-white my-2 text-xs md:text-base inline-flex gap-2" type="button" onClick={uploadImages}>Upload Images</button>
            </div>
            {
                props.existingImgs?.length! > 0 && (
                    <div className="my-4">
                        <hr />
                        <h3 className="mt-4">Existing Images</h3>
                        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {
                                props.existingImgs?.map((img) => {
                                    return (
                                        <div className="h-32 flex" key={img}>
                                            <Image className="w-full object-cover rounded-md" src={img} width="200" height="200" alt="hello" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default UploadPhotos;