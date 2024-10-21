import joi from 'joi'

export const ValidateCreateCollectionBody = joi.object({
    workspaceId: joi.string().min(2).max(1000).trim().required(),
    collectionName: joi.string().min(2).max(1000).trim().required()
})

export const validateJoiSchema = (schema, value) => {
    const result = schema.validate(value);

    return {
        value: result.value,
        error: result.error
    };
};
