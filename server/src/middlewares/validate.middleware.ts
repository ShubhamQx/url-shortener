import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ApiError from "../utils/ApiError";

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new ApiError(400, "Invalid Credentials" ));
    }
    req.body = result.data;
    return next();
  };
};
