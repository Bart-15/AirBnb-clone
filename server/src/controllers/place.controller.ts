import { Request, Response, NextFunction  } from "express";
import { CreatePlaceInput } from "../schema/place.schema";
import { TUserDoc } from '../types/user.types';
import { AppError } from "../middleware/errHandler";
import { createPlaces, getPlacesByUser, placesIndex, getPlaceById, deletePlaceById } from "../service/place.service";

export async function addPlace(
    req: Request<{}, {}, CreatePlaceInput>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const authUser = req.user as TUserDoc;

        const { title, address, photos, extraInfo, checkOut, maxGuests, price } = req.body;

        // const fileName = req?.file?.filename
        // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        // const intCheckOut = parseInt(checkOut); 
        // const intMaxGuests =  parseInt(maxGuests);
        // const intPrice =  parseInt(price);

        // console.log({
        //     fileName,
        //     basePath,
        //     intCheckOut,
        //     intMaxGuests,
        //     intPrice
        // })
        const files = req.file as Express.Multer.File;

        console.log("this is the file", files)
    }catch(e) {
        console.log(e);
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
        const { title, address, photos, extraInfo, checkOut, maxGuests, price } = req.body;

        const place = await getPlaceById(req.params.id);

        if(!place) throw new AppError(404, "Place not found.");
        
        if(place?.owner.toString() !== authUser.id) throw new AppError(401, "Unauthorized");

        place.set({ title, address, photos, extraInfo, checkOut, maxGuests, price });

        await place.save();
        
        res.status(200).json({
            success: true,
            message: "Place updated successfully"
        });
    }catch(e) {
        next(e)
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