import Joi from "joi";

export const formValidation = Joi.object({
    classes: Joi.string()
        .required()
        .messages({
            'string.empty': `"班級" is a required field`
        })
    ,
    userName: Joi.string()
        .required()
        .messages({
            'string.empty': `"申請人" is a required field`
        })
    ,
    userMail: Joi.string()
        .required()
        .messages({
            'string.empty': `"Email" is a required field`
        })
    ,
    applyDate: Joi.string()
        .required()
        
    ,
    rentDate: Joi.string()
        .required()
        .messages({
            'string.empty': `"欲租借日期" is a required field`
        })
    ,
    description: Joi.string()
        .required()
        .messages({
            'string.empty': `"租借時段" is a required field`
        })
    ,
    TimePeriod: Joi.string()
        .required()
        .messages({
            'string.empty': `"租借時段" is a required field`
        })
    ,
});

