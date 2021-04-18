import {LanguageService} from './';
import {Message} from "../models";
import {MultilingualString} from "../models/language";
import { log } from 'console';

export class MessageService {
    constructor(protected languageService = new LanguageService()){}

    public async add(message: any) {

        const languages = await this.languageService.getAll();
        const mlMessage = new MultilingualString(message, languages);
            return Message.create(mlMessage)
              .catch(error => {
                  if(error.code === 11000) {
                      throw new Error(`_id ${message._id} is already exist!`);
                  }
              })
    }

    public async get(languageId?: string) {
        const messages = await Message.find({}).lean();
        const converted = {};
        messages.forEach((e: any) => {
            // @ts-ignore
            converted[e._id.toString()] = e.value[languageId || 1];
        });
        return converted
    }
}


