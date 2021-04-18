import mongoose, {Schema, model} from "mongoose";
import validator from "validator";

// export type CategoryType = "product" | "service" | "request";

export interface ICategory {
    id: string;
    name: string;
    image_url: string
}

export interface ICategoryModel extends mongoose.Document {
    name: string,
    image_url: string
}

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    image_url: {type: String, required: true}
},{
    versionKey: false
});

export const CategoryModel = model<ICategoryModel>('categories', schema, 'category');

