/**
 * function to be placed in _validation.js
 */
import { body } from 'express-validator';

export const validateTitle = body('title')
  .notEmpty().withMessage('Title is required')
  .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long');

export const validateDescription = body('description')
  .notEmpty().withMessage('Description is required')
  .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long');
