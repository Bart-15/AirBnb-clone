import Place from '../models/place.model';
import { IPlace } from '../types/place.types';

export function createPlaces(input: Partial<IPlace>){
    return Place.create(input);
}

export function getPlacesByUser(input:string){
    return Place.find({owner:input});
}

export function placesIndex(){
    return Place.find({});
}

export function getPlaceById(id:string){
    return Place.findById(id);
}

export function updatePlaceImages(id:string, images: string[]){
    return Place.findByIdAndUpdate(id, {images:images})
}

export function deletePlaceById(id:string){
    return Place.findByIdAndDelete(id);
}