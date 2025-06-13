import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateAccount = [
  body('account_name')
    .notEmpty()
    .withMessage('Account name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Account name must be between 3 and 50 characters'),
  
  body('website')
    .optional()
    .isURL()
    .withMessage('Website must be a valid URL'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Invalid Data",
        errors: errors.array()
      });
      return;
    }
    next();
  }
];

export const validateDestination = [
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('URL must be valid'),
  
  body('http_method')
    .notEmpty()
    .withMessage('HTTP method is required')
    .isIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
    .withMessage('HTTP method must be valid'),
  
  body('headers')
    .isArray()
    .withMessage('Headers must be an array'),
  
  body('headers.*.key')
    .notEmpty()
    .withMessage('Header key is required'),
  
  body('headers.*.value')
    .notEmpty()
    .withMessage('Header value is required'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Invalid Data",
        errors: errors.array()
      });
      return;
    }
    next();
  }
];

export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Invalid Data",
        errors: errors.array()
      });
      return;
    }
    next();
  }
];
export const validateIncomingData = [
  body()
    .custom((value, { req }) => {
      if (!req.headers) {
        throw new Error('Request headers are missing');
      }
      
      if (!req.headers['cl-x-token']) {
        throw new Error('CL-X-TOKEN header is required');
      }
      
      if (!req.headers['cl-x-event-id']) {
        throw new Error('CL-X-EVENT-ID header is required');
      }
      
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Invalid Data",
        errors: errors.array()
      });
      return;
    }
    next();
  }
];

export const validateMember = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("roleId")
    .isMongoId()
    .withMessage("Valid role ID is required")
];

export const validateRoleUpdate = [
  body("roleId")
    .isMongoId()
    .withMessage("Valid role ID is required")
];