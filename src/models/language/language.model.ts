import {Schema, model} from "mongoose";

export interface ILanguage {
    id?: number,
    name: string,
    acronym: string,
    nativeName: string
}

const schema = new Schema({
    id: {type: Number},
    name: {type: String, required: true},
    acronym: {type: String, required: true},
    nativeName: {type: String, required: true}
},{
    versionKey: false,
});

export const Language = model('language', schema, 'language', true);
