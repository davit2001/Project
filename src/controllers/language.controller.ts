import {Request, Response, Router} from 'express';
import {LanguageService} from '../services';
import {IController} from "./IController";
import {ILanguage} from "../models";
import {log} from 'console';

export class LanguageController implements IController {
    public router: Router = Router();

    constructor(private languageService = new LanguageService()) {
        this.bindMethods();
        this.initRoutes();
    }

    private bindMethods(): void {
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.getAvailable = this.getAvailable.bind(this);
        this.notFound = this.notFound.bind(this);
    }

    private initRoutes(): void {
        this.router
            .get('/', this.getAll)
            .get('/:id', this.getById)
            .get('/available', this.getAvailable)
            .post('/', this.add)
            .put('/:id', this.edit)
            .delete('/:id', this.remove)
            .all("*", this.notFound);
    }

    private getById(req: Request, res: Response) {
        const { id } = req.params;
        this.languageService.getById(+id)
            .then((language: any) => {
                res.send(language)
        });
    }

    private getAll(req: Request, res: Response){
        this.languageService.getAll()
            .then((languages: any) => {
                res.send(languages);
            });
    }

    private add(req: Request, res: Response){
        const language: ILanguage = req.body;

        this.languageService.add(language)
            .then((data: any) => {
                res.send(data)
            })
          .catch(err => {
              log(err)
          });
    }

    private edit(req: Request, res: Response) {
        const id = req.params.id;
        const language: ILanguage = req.body;
        this.languageService.edit(id, language)
                    .then((data: any) => {
                        res.send(data)
                    });
    }

    private remove(req: Request, res: Response) {
        const id = req.params.id;
        this.languageService.remove(id)
                .then((data: any) => {
                    res.send(data)
                });
    }

    private getAvailable(req: Request, res: Response) {
        this.languageService.getAvailable()
            .then((data: any) => {
                res.send(data)
        })
    }

    private notFound(req: Request, res: Response) {
        res.status(404).send("Not Found")
    }

    public getRouter(): Router {
        return this.router;
    }
}



