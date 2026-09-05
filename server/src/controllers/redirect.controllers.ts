import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { linkTable } from "../db/schema/link.schema";
import { eq, sql } from "drizzle-orm";
import ApiError from "../utils/ApiError";

const redirectLink = async (
  req: Request<{ code: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code } = req.params;

    const [result] = await db
      .update(linkTable)
      .set({ clickCount: sql`${linkTable.clickCount} + 1` })
      .where(eq(linkTable.code, code))
      .returning({ fullLink: linkTable.fullLink });

    if (!result) {
      throw new ApiError(404, "Link not found");
    }

    res.status(302).redirect(result.fullLink);
  } catch (err) {
    next(err);
  }
};

export { redirectLink };
