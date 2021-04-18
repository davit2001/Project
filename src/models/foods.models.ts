import mongoose, {Schema, model} from "mongoose";

export interface IFoods {
    name: string;
    image_url: string;
    description: string;
    price: number;
    rate: number;
    preparation_time: number;
    category_id: string;
}

export interface IFoodsModel extends mongoose.Document {
    name: string;
    image_url: string;
    description: string;
    price: number;
    rate: number;
    preparation_time: number;
    category_id: string;
}

const schema = new Schema({
    name: {type: String, required: true},
    image_url: {type: String, required: true},
    description:{type: String, required: true},
    price: {type: String, required: true},
    rate: String,
    preparation_time: Number,
    category_id: {
        type: String,
        ref: 'category'
    }
}, {
    versionKey: false
})

export const FoodsModel = model<IFoodsModel>('foods', schema, 'foods');