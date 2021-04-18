import {Request, Response, Router} from 'express';
import {IController} from "./IController";
import {FoodsService} from '../services/foods.service'
import {IFoods} from '../models/foods.models';


export class FoodsController implements IController {
    public router: Router = Router();

    constructor (protected foodsService: FoodsService = FoodsService.getInstance()) {
        this.bindMethods();
        this.initRoutes();
    }



    private bindMethods(): void {
        this.getById = this.getById.bind(this);
        this.removeById = this.removeById.bind(this);
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.getCategoryByIds = this.getCategoryByIds.bind(this);
        this.notFound = this.notFound.bind(this);
   }
    private initRoutes(): void {
        this.router
        .get('/', this.getAll)
        .get('/:id', this.getById)
        .post('/all', this.getCategoryByIds)
        .post('/*', this.notFound)
        .post('/', this.add)
        .put('/', this.edit)
        .put('/*', this.notFound)
        .delete('/:id', this.removeById)
        .all("*", this.notFound);
}

private getById(req: Request, res: Response): void {
    this.foodsService.getById(req.params.id)
     .then((data: any) => {
         res.send(data);
     })
     .catch((error: Error) => {
         res.status(403).send(error.message)
     })
}

private getAll(req: Request, res: Response): void {
    this.foodsService.getAll()
    .then((data: any) => {
        res.send(data)
    })
    .catch((error: Error) => {
        res.status(403).send(error.message)
    })
}
private add(req: Request, res: Response) {
    const category = req.body;
    this.foodsService.add(category)
        .then((data: any) => {
        res.send(data);
    })  .catch((error: Error) => {
            res.send(error.message)
        })
}

private edit(req: Request, res: Response) {
    const id = req.body._id;
    const category: IFoods = req.body;
    this.foodsService.edit(id, category)
        .then((data: any) => {
            res.send(data)
        }).catch(error => {
            res.send(error.message)
        })
}

private removeById(req: Request, res: Response) {
    const id = req.params.id;
    this.foodsService.removeById(id)
        .then((data: any) => {
            res.send(data);
    })
    .catch(error => {
        res.send(error.message)
    })
}

private getCategoryByIds(req: Request, res: Response) {
  const data: any = req.body.data;

 this.foodsService.getCategoryByIds(data)
    .then((result: any) => {
        res.send(result);
   }).catch(error => {
       res.send(error.message)
   })
}

    private notFound(req: Request, res: Response) {
        let path = req.params[0];

        if (path.split('/')[2]) {
             path = path.split('/')[2]
        } else  {
            path = path.split('/')[1]
        }
    }


    public getRouter(): Router {
        return this.router;
    }

}