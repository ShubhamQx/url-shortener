import { NextFunction, Request, Response } from "express";
import {
  LoginInputType,
  RegisterInputType,
} from "../validations/auth.validations";
import { db } from "../db";
import { NewUser, userTable } from "../db/schema/user.schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

const registerUser = async (
  req: Request<{}, {}, RegisterInputType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, email, password } = req.body;

    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    if (existingUser) {
      throw new ApiError(400, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: NewUser = {
      fullName,
      email,
      password: hashedPassword,
    };
    const [createdUser] = await db.insert(userTable).values(newUser).returning({
      id: userTable.id,
      email: userTable.email,
      fullName: userTable.fullName,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", createdUser));
  } catch (err) {
    next(err);
  }
};

const loginUser = async (
  req: Request<{}, {}, LoginInputType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    if (!user) {
      throw new ApiError(400, "Email not registered");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "5m" },
    );

    res.cookie("token", token, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json(new ApiResponse(200, "Logged in successfully", {id: user.id, fullName: user.fullName, email: user.email}));

  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.token) {
      throw new ApiError(400, "Already logged out");
    }
    
    res
      .clearCookie("token",{httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000})
      .status(200)
      .json(new ApiResponse(200, "Logged out successfully", {}));

  } catch (err) {
    next(err);
  }
};

const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  try {
    const userId = (req as any).user.id
    const [user] =  await db
    .select({
      id: userTable.id, 
      fullName: userTable.fullName, 
      email:userTable.email
    })
    .from(userTable)
    .where(eq(userTable.id, userId)) 

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    res
    .status(200)
    .json(new ApiResponse(200, "User found successfully", user))
  } catch (err) {
    next(err)
  }
}

export { registerUser, loginUser, logoutUser, getMe };
