const Joi = require('@hapi/joi')

export const CategoryValidate = (data: any) => {
    const schema = Joi.object({
        _id: Joi.string(),
        name: Joi.string().required(),
        image_url: Joi.string().required()
    })
    return schema.validate(data)
}

export const FoodsValidate = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        image_url: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        rate: Joi.number().required(),
        preparation_time: Joi.number().required(),
        category_id: Joi.string()
    })
    return schema.validate(data)
}

