import {ILanguage} from "./language.model";
import * as mongoose from "mongoose";

export interface IMultilingualString {
    _id: string,
    value: {
        [key: string]: string
    };
}

export interface MultilingualStringModel  {
    _id: string,
    value: {
        [key: string]: string
    }
}

export class MultilingualString {
    public _id: string;
    value: {
        [key: string]: string | null
    };

    public getValue(languageId: string | number): string | null {
        return this.value[languageId];
    }

    constructor(message: IMultilingualString, languages: any[]){
        this._id = message._id;
        this.value = message.value;

        languages.forEach((el: ILanguage) => {
            if(!this.value.hasOwnProperty(el.id.toString())) this.value[el.id.toString()] = null;
        })
    }
}
