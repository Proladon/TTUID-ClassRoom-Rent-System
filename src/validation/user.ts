import Joi from "joi";

export const user = (name: string) => {
    return Joi.object({
        name: Joi.string()
            .required()
            .messages({
                'string.empty': `"${name}" is a required field`
            }),
    
        classNum: Joi.string()
            .required()
            .messages({
                'string.empty': `"班級座號" is a required field`
            }),
        
        studentID: Joi.string()
            .required()
            .messages({
                'string.empty': `"學號" is a required field`
            }),
        
        phone: Joi.string()
            .required()
            .messages({
                'string.empty': `"電話" is a required field`
            }),
    })
}
