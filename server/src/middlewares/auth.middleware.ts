import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../db";
import { userTable } from "../db/schema/user.schema";
import { eq } from "drizzle-orm";
import ApiError from "../utils/ApiError";
import { cookieOptions } from "../config/cookie";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ApiError(401, "Please Login/Signup first");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as JwtPayload;

    const [user] = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.id, decoded.id));

    if (!user) {
      res.clearCookie("token", cookieOptions);
      throw new ApiError(401, "Token expired or User doesn't exist");
    }

    (req as any).user = user;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.clearCookie("token", cookieOptions);

      return next(new ApiError(401, "Session expired, please log in again"));
    }
    next(err);
  }
};

export { authMiddleware };
