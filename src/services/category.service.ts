import {ICategory, CategoryModel} from '../models/category.model';
import {CategoryValidate} from '../validation/joi'
import {ObjectId} from 'mongodb'
import mongoose from 'mongoose';

export class CategoryService {
    private static instance: CategoryService;
    private constructor(){};

    static getInstance(): CategoryService {
        if(!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }

    public getById(id: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`Id is incorrect: ${id}`)
            return CategoryModel.findById(id);
        } catch(err) {
            throw new Error(err)
        }
    }


    public async getAll() {
        try {
           return CategoryModel.find();
        } catch (err) {
            throw new Error(err)
        }
    }

   public async add(category: any) {
       const {error} = CategoryValidate(category)
       if (error) throw new Error(error.details[0].message);

       try {
          return await CategoryModel.create(category)
      } catch(err) {
          throw new Error(err);
      }
   }





    public removeById(id: string){
        try {
            if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`Id is incorrect: ${id}`)
            return CategoryModel.deleteOne({_id: id})
        } catch (err) {
            throw new Error(err)
        }
    }

    public edit(id: any, category: ICategory) {
        try {
            const {error} = CategoryValidate(category)
            if (error) throw new Error(error.details[0].message);

            if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`Id is incorrect: ${id}`)
            const Id = new ObjectId(id)
            return CategoryModel.findByIdAndUpdate(Id, category).then(() => {
                return CategoryModel.findById(Id);
            })
        } catch(err) {
            throw new Error(err);
        }

    }

   public getCategoryByIds(data: any) {
     try {
         const ids: any = [];
         data.forEach( (item: any) => {
             ids.push(new ObjectId(item))
         })
         return CategoryModel.find({ _id : {$in: ids}})
     } catch(err) {
        throw new Error(err)
     }
   }


}