import express from "express";
import { redirectLink } from "../controllers/redirect.controllers";

const router = express.Router();

router.get("/:code", redirectLink);

export default router;
