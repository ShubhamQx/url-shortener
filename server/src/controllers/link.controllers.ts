import { Request, Response, NextFunction } from "express";
import { CreateLinkInputType } from "../validations/link.validations";
import { nanoid } from "nanoid";
import { linkTable, NewLink } from "../db/schema/link.schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

const generateUniqueCode = async () => {

  let code;
  let existingCode;

  do {
    code = nanoid(6) 
    existingCode = await db.select().from(linkTable).where(eq(linkTable.code, code))

  } while (existingCode.length > 0);

  return code;
}

const getAllLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = (req as any).user.id
    
    const links = await db.select().from(linkTable).where(eq(linkTable.userId, userId))

    res
    .status(200)
    .json(new ApiResponse(200, "Links fetched successfully", links))

  } catch (err) {
    next(err)
  }
}

const getLink = async (
  req: Request<{ code: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;

    const [result] = await db.select().from(linkTable).where(eq(linkTable.code, code))

    if(!result){
      throw new ApiError(404, 'Link not found')
    }

    if(result.userId !== (req as any).user.id){
      throw new ApiError(403, 'Not authorized to view this link')
    }

    res
    .status(200)
    .json(new ApiResponse(200, 'Link found successfully', result))

  } catch (err) {
    next(err)
  }
};

const createShortenLink = async (
  req: Request<{}, {}, CreateLinkInputType>,
  res: Response,
  next: NextFunction,
) => {
    try {
      const userId = (req as any).user.id
      const { fullLink } = req.body

      const shortCode = await generateUniqueCode()

      const newLink: NewLink = {
        code: shortCode,
        fullLink,
        userId
      }

      await db.insert(linkTable).values(newLink)

      res
      .status(201)
      .json(new ApiResponse(201, 'Short link created successfully', []))

    } catch (err) {
      next(err)
    }
};


const deleteShortenLink = async (
  req: Request<{code: string}>,
  res: Response,
  next: NextFunction
) => {
  try {

    const { code } = req.params

    await db.delete(linkTable).where(eq(linkTable.code, code))
    
    res
    .status(200)
    .json(new ApiResponse(200, "link deleted successfully", null))

  } catch (err) {
    next(err)
  }
}

export { getAllLinks, getLink, createShortenLink, deleteShortenLink }