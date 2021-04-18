import {FoodsModel, IFoods, IFoodsModel} from '../models/foods.models'
import {FoodsValidate} from '../validation/joi'
import {log} from 'console';
import {ObjectId} from 'mongodb'
import mongoose from 'mongoose';

export class FoodsService {
    private static instance: FoodsService;
    private constructor() {};

    static getInstance(): FoodsService {
        if (!FoodsService.instance) {
            FoodsService.instance = new FoodsService()
        }
        return FoodsService.instance;
    }

    public getById(id: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`Id is incorrect: ${id}`)
           return FoodsModel.findById(id)
        } catch(err) {
            throw new Error(err)
        }
    }

    public getAll () {
        try {
          return FoodsModel.find()
        } catch(err) {
            throw new Error(err)
        }
    }
    public async add(category: any) {
        const {error} = FoodsValidate(category)
        if (error) throw new Error(error.details[0].message)
        try {
           return await FoodsModel.create(category)
       } catch(err) {
           throw new Error(err);
       }
    }





     public removeById(id: string){
         try {
            if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`Id is incorrect: ${id}`)
             return FoodsModel.deleteOne({_id: id})
         } catch (err) {
             throw new Error(err)
         }
     }

     public edit(id: any, category: IFoods) {
         try {
            if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`Id is incorrect: ${id}`)

             const Id = new ObjectId(id)
             return FoodsModel.findByIdAndUpdate(Id, category).then(() => {
                 return FoodsModel.findById(Id);
             })
         } catch(err) {
             throw new Error(err)
         }

     }

    public getCategoryByIds(data: any) {
      try {
          const ids: any = [];
          data.forEach( (item: any) => {
              ids.push(new ObjectId(item))
          })
          return FoodsModel.find({ _id : {$in: ids}})
      } catch(err) {
         throw new Error(err)
      }
    }
}