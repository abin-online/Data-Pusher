import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: "Validation Error",
      details: err.message
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
    return;
  }

  if (err.name === 'MongoError' && (err as any).code === 11000) {
    res.status(400).json({
      success: false,
      message: "Duplicate entry"
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}