import {Request, Response, Router} from 'express';
import {CategoryService} from '../services/category.service';
import {IController} from "./IController";
import {ICategory} from "../models/category.model";
import {log} from 'console'

export class CategoryController implements IController {
    public router: Router = Router();

    constructor(protected categoryService: CategoryService = CategoryService.getInstance()) {
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
            .post('/', this.add)
            .put('/', this.edit)
            .put('*', this.notFound)
            .delete('/:id', this.removeById)
            .all("*", this.notFound);
    }

    private getById(req: Request, res: Response): void {
      this.categoryService.getById(req.params.id)
          .then((data: any) => {
               res.send(data);
            })
            .catch((error) => {
                    res.send(error.message)
            })
    }

    private getAll(req: Request, res: Response) {
        // const {query} = req;
        this.categoryService.getAll()
            .then((data: any) => {
                res.send(data);
        })
            .catch(error => {
                res.status(403).send(error.message)
            });
    }



    private add(req: Request, res: Response) {
        const category = req.body;
        this.categoryService.add(category)
            .then((data: any) => {
                res.send(data);
            })  .catch((error) => {
                res.send(error)
            })
    }

    private edit(req: Request, res: Response) {
        const id = req.body._id;
        const category: ICategory = req.body;
        this.categoryService.edit(id, category)
            .then((data: any) => {
                res.send(data)
            }).catch((error) => {
                res.status(404).send(error.message)
            })
    }

    private removeById(req: Request, res: Response) {
        const id = req.params.id;
        this.categoryService.removeById(id)
            .then((data: any) => {
                res.send(data);
        })
        .catch(err => {
            res.send(err.message)
        })
    }
    private getCategoryByIds(req: Request, res: Response) {
      const data: any = req.body.data;

     this.categoryService.getCategoryByIds(data)
        .then((result: any) => {
            res.send(result);
       }).catch(err => {
           res.send(err.message)
       })
    }

    private notFound(req: Request, res: Response) {
       let path = req.params[0];

        if (path.split('/')[2]) {
             path = path.split('/')[2]
        } else  {
            path = path.split('/')[1]
        }

         res.status(404).send(`${path}  page not Found`)
    }

    public getRouter(): Router {
        return this.router;
    }
}



