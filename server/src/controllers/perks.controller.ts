import { Request, Response, NextFunction  } from "express";
import { CreatePerksInput } from "../schema/place.schema";
import { createPerks, getPerksById, deletePerks, perksIndex } from "../service/perks.service";
import { AppError } from "../middleware/errHandler";

export async function addPerks(
    req: Request<{}, {}, CreatePerksInput>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const perks = await createPerks(req.body)
        res.status(200).json({
            success:true,
            data:perks,
        });
    }catch(e) {
        next(e);
    }
}

export async function getAllPerks(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const perks = await perksIndex();
        return res.status(200).json({
            success:true,
            data: perks
        })
    }catch(e) {
        next(e)
    }
}

export async function destroyPerks(
    req: Request<{id: string}, {}, {}>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const perks = await getPerksById(req.params.id);
        if(!perks) return res.status(404).json({success: false, message:"Perks not found"});

        await deletePerks(req.params.id);

        res.status(200).json({
            success: true,
            message:"Perks deleted Successfully"
        });

    }catch(e){
        next(e);
    } 
}