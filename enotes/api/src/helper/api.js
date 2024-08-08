import { validationResult } from 'express-validator';
import { badRequest } from '../utils/Exception.js';

export const handleValidationResult = (req) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw badRequest().setData(validationErrors.mapped());
  }
}
;
