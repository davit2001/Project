import {Schema, model} from "mongoose";

export interface IMessage {
    _id: string,
    value: object
}

const schema = new Schema({
    _id: {type: String},
    value: {type: Object, required: true}
},{
    versionKey: false
});

export const Message = model('mlString', schema);
