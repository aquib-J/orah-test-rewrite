import Joi from 'joi';


const create = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    photo_url: Joi.string().required(),
})

const update = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    photo_url:Joi.string().optional(),
})


export default { create, update };