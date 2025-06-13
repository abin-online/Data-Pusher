import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const accountRateLimiter  = rateLimit({
  windowMs: 1000, // 1 second
  max: 5, // 5 requests per second per account
  keyGenerator: (req: Request) => {
   
    const token = req.headers['cl-x-token'];
    return (typeof token === 'string' ? token : req.ip) || 'unknown';
  },
  message: {
    success: false,
    message: "Too many requests, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});