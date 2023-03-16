import Perks from "../models/perks.model";
import { IPerks } from "../types/place.types";

export function createPerks(input: Partial<IPerks>){
    return Perks.create(input);
}

export function perksIndex(){
    return Perks.find({});
}

export function getPerksById(id: string) {
    return Perks.findById(id)
}

export function deletePerks(id:string){
    return Perks.findByIdAndDelete(id);
}