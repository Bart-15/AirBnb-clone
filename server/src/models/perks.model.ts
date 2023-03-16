import { IPerks } from "../types/place.types";
import { model, Schema } from 'mongoose';

const perksSchema = new Schema({
    name: {
        type: String
    },
    path: {
        type:String
    }
});

const Perks = model<IPerks>("Perk", perksSchema);

export default Perks;
