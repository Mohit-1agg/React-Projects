/**
 * function to be placed in _validation.js
 */
import { body } from 'express-validator';

export const validateName = body('name')
  .notEmpty().withMessage('Name is required')
  .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long');

export const validateEmail = body('email')
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Invalid Email!');

export const passwordRequired = body('password')
  .notEmpty().withMessage('Password is required');

export const validatePassword = body('password')
  .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long');
