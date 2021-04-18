import config from '../config';

import mongoose, { ConnectionOptions } from "mongoose";
import {log} from 'console';
// TODO: change db name param
const options: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'shop'
};

export default async function(){
    const {databaseURL} = config;
    try {
        await mongoose.connect(databaseURL, options)
    } catch (error) {
        throw new Error(error)
    }
    // @ts-ignore
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
}

