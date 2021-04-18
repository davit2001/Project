import {Request, Response, Router} from 'express';
import {MessageService} from '../services';
import {IController} from "./IController";
import {IMessage, Message} from "../models";


export class MLController implements IController {
    public router: Router = Router();

    constructor(private messageService = new MessageService()) {
        this.bindMethods();
        this.initRoutes();
    }

    private bindMethods(): void {
        this.get = this.get.bind(this);
        this.add = this.add.bind(this);
        this.notFound = this.notFound.bind(this);
    }

    private initRoutes(): void {
        this.router
            .get('/', this.get)
            .post('/', this.add)
            .all("*", this.notFound)

    }

    public get(req: Request, res: Response) {
        const languageId: string = req.query.languageId.toString();
        return this.messageService.get(languageId)
            .then((languages: any) => {
                res.send(languages);
            });
    }

    public add(req: Request, res: Response) {
        const language: IMessage = req.body;

        return this.messageService.add(language)
            .then(data => {
                res.send(data)
            });
    }

    // public edit(req: Request, res: Response) {
    //     const id = req.params.id;
    //     const language: IMessage = req.body;
    //     return this.messageService.edit(id, language)
    //         .then(data => {
    //             res.send(data)
    //         });
    // }
    //
    // public remove(req: Request, res: Response) {
    //     const id = req.params.id;
    //     return Message.findByIdAndRemove(id)
    //         .then(data => {
    //             res.send(data)
    //         });
    // }

    private notFound(req: Request, res: Response) {
        res.status(404).send("Not Found")
    }

    public getRouter(): Router {
        return this.router;
    }
}



