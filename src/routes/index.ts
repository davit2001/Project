import {Router} from 'express';
import {
    CategoryController,
    FoodsController,
    LanguageController,
    MLController
} from "../controllers";
import {IController} from "../controllers/IController";

export class MainRouter implements IController {
    public router: Router = Router();

    private categoryController:  CategoryController  = new CategoryController();
    private foodsController: FoodsController = new FoodsController();
    private languageController:  LanguageController = new LanguageController();
    private mlController:   MLController   = new MLController();


    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router
            .use('/category', this.categoryController.getRouter())
            .use('/foods', this.foodsController.getRouter())
            .use('/languageservice', this.languageController.getRouter())
            .use('/mlservice', this.mlController.getRouter())
    }

    public getRouter(): Router {
        return this.router;
    }
}








