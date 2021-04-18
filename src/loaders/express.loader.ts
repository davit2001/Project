import express, {Request, Response, Application, NextFunction} from "express";
import path from 'path';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import {MainRouter} from "../routes";
import { log } from 'console';

export class ExpressLoader {
    private dir: string = path.join(__dirname, '../public');
    private uploads = path.join(__dirname, '../../uploads');
    private mainRouter: MainRouter = new MainRouter();
    protected app: Application;

    constructor(app: Application) {
        this.app = app;
        this.initLoaders();
    }

    private initLoaders(): void {
        this.app.use(cookieParser());
        this.app.use(express.static(this.dir));
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.text());
        this.app.use(cors({origin: "*", credentials: true}));
        this.app.use('/uploads', express.static(this.uploads));
        this.app.use('/api/', this.mainRouter.getRouter());
        this.app.set('views',  this.dir);
        this.app.get('*', (req: Request, res: Response) => {
            res.sendFile('index.html', {root: this.dir});
        });
    }
}

