import {Language, ILanguage} from "../models/language";
import fs from 'fs';
import path from 'path';

export class LanguageService {

    public getAll(){
        return Language.find({});
    }

    public getById(languageId: number) {
        return Language.findOne({id: languageId})
    }

    public add(language: ILanguage){
        return Language.create(language);
    }

    public edit(id: string, language: ILanguage) {
        return Language.findByIdAndUpdate(id, language);
    }

    public remove(id: string) {
        return Language.findByIdAndRemove(id);
    }

    public async getAvailable() {
        const reqPath = path.join(__dirname, '../../public/languages.json');
        return new Promise((res) => {
            try{
                fs.readFile(reqPath,'utf8',(err, data) => {
                    if(err) throw err;
                    res(data);
                })}
            catch(err){
                res(err);
            }
        });
    }
}