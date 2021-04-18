import express, {Application} from "express";
import {ExpressLoader} from './express.loader';
import dbLoader from './db.loader';
import {log, dir} from 'console';
import config from "../config";
// import jobs from "../jobs";
// import Job from "../jobs";
import http, { Server } from "http";
// import { SocketLoader } from "./socket.loader";

export default async () => {
    const app: Application = express();
    const server: Server   = http.createServer(app);
    // const socketLoader     = new SocketLoader(server);
    const expressLoader    = new ExpressLoader(app);
    const dbConnection     = await dbLoader().catch(error => dir(error));
    // const job              = new Job();

    log('MongoDB Initialized');

    server.listen(config.port, () => {

        log(`Your server is ready on port ${config.port}!`);
    });

    log('Express Initialized');
}