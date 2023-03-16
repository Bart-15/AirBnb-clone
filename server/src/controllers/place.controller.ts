import { Request, Response, NextFunction  } from "express";
import { Types } from 'mongoose';
import { CreatePlaceInput } from "../schema/place.schema";
import { TUserDoc } from '../types/user.types';
import { AppError } from "../middleware/errHandler";
import { createPlaces, getPlacesByUser, placesIndex, getPlaceById, deletePlaceById, updatePlaceImages } from "../service/place.service";

export async function addPlace(
    req: Request<{}, {}, CreatePlaceInput>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const authUser = req.user as TUserDoc;

        const { title, address, images, description, small_description, perks, checkOut, checkIn, maxGuests, price } = req.body;

        const place = await createPlaces({ owner: authUser.id, title, address, perks, images, description, small_description, checkOut, checkIn, maxGuests, price });

        res.status(200).json({
            success:true,
            data:place,
        });

    }catch(e) {
        next(e);
    }
}

export async function getUserPlaces(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
    try{
        const authUser = req.user as TUserDoc;

        const places = await getPlacesByUser(authUser.id);

        res.status(200).json({
            success:true,
            places
        });
    }catch(e){
        next(e)
    } 
}

export async function getPlaces(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const places = await placesIndex();

        res.status(200).json({
            success:true,
            places
        });
    }catch(e) {
        next(e)
    }
}

export async function getPlace(
    req: Request<{id:string}>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const place = await getPlaceById(req.params.id);
        if(!place) throw new AppError(404, "Place not found");

        return res.status(200).json({
            success: true,
            place
        });
    }catch(e) {
        next(e)
    }
}

export async function updatePlace(
    req: Request<{id: string}, {}, CreatePlaceInput>, 
    res: Response, 
    next: NextFunction
    ){
    try{
        const authUser = req.user as TUserDoc;
        const { title, address, images, description, small_description, perks, checkOut, checkIn, maxGuests, price } = req.body;

        const place = await getPlaceById(req.params.id);

        if(!place) throw new AppError(404, "Place not found.");
        
        if(place?.owner.toString() !== authUser.id) throw new AppError(401, "Unauthorized");

        place.set({ owner: authUser.id, title, address, perks, images, description, small_description, checkOut, checkIn, maxGuests, price  });

        await place.save();
        
        res.status(200).json({
            success: true,
            message: "Place updated successfully"
        });
    }catch(e) {
        next(e)
    }
}

export async function uploadMultipleImages(
    req: Request<{id: string}, {}, {}>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        if(!Types.ObjectId.isValid(req.params.id)) throw new AppError(400, "Invalid id");

        const authUser = req.user as TUserDoc;

        const place = await getPlaceById(req.params.id);

        if(!place) return res.status(404).json({success: false, message:"Place not found"});
        
        if(place?.owner.toString() !== authUser.id) throw new AppError(401, "Unauthorized");

        const imagePaths: string[] = [];
        const files = req.files as Express.Multer.File[];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        
        if(files) {
            files.map(file => {
                imagePaths.push(`${basePath}${file.filename}`);
            })
        }

        place.set({ images: imagePaths });
        await place.save();

        res.status(200).json({
            success: true,
            message: "Images Uploaded successfully."
        });
    }catch(e) {
        console.log(e);
    }

}

export async function destroyPlace(
    req: Request<{id: string}, {}, {}>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const authUser = req.user as TUserDoc;

        const place = await getPlaceById(req.params.id);
        if(!place) throw new AppError(404, "Place not found.");

        if(place?.owner.toString()  !== authUser.id) throw new AppError(401, "Unauthorized");

        await deletePlaceById(req.params.id);

        res.status(200).json({
            success: true,
            message:"Place deleted Successfully"
        });
    }catch(e) {
        next(e);
    }
}