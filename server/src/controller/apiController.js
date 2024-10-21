import httpResponse from '../util/httpResponse.js';
import responseMessage from '../constant/responseMessage.js';
import httpError from '../util/httpError.js';
import quicker from '../util/quicker.js';
import { ValidateCreateCollectionBody, validateJoiSchema } from '../service/validationService.js';

export default {
    self: (req, res, next) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    health: (req, res, next) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now(),
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    self: (req, res, next) => {
        try {
            const { workspaceId, collectionName } = req.body;
            const apiKey = req.headers['authorization'];
            if (!apiKey || !apiKey.startsWith('Bearer ')){
                httpError(next, err, req, 401);
            }

            const { value, error } = validateJoiSchema(ValidateCreateCollectionBody,{
                workspaceId,
                collectionName,
            })
            if (error) {
                return next(next, err, req, 422);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS,value);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
};
