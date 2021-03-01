import Joi from "joi";
import {user} from './user'

export const formValidation = Joi.object({
    classes: Joi.string()
        .required()
        .messages({
            'string.empty': `"班級" is a required field`
        })
    ,
    teacher: Joi.string()
        .required()
        .messages({
            'string.empty': `"授課教師" is a required field`
        }),
    
    description: Joi.string()
        .required()
        .messages({
            'string.empty': `"租借時段" is a required field`
        }),
    
    toolsRent: Joi.string()
        .required()
        .messages({
            'string.empty': `"借用器材" is a required field`
        }),
    
    userMail: Joi.string()
        .required()
        .messages({
            'string.empty': `"Email" is a required field`
        }),
    
    applyUser: user('借用人'),
    
    agentUser: user('代理人'),
    
    applyDate: Joi.string()
        .required(),
    
    classMate: Joi.array().items(user('共同使用人')),
    rentDate: Joi.string()
        .required()
        .messages({
            'string.empty': `"欲租借日期" is a required field`
        }),
    
    TimePeriod: Joi.string()
        .required()
        .messages({
            'string.empty': `"租借時段" is a required field`
        }),
});

