import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllLinks, getLink, createShortenLink, deleteShortenLink } from "../controllers/link.controllers";
import { validate } from "../middlewares/validate.middleware";
import { createLinkValidator } from "../validations/link.validations";

const router = express.Router()

router.use(authMiddleware)

router.get('/', getAllLinks)
router.get('/:code', getLink)
router.post('/', validate(createLinkValidator), createShortenLink)
router.delete('/:code', deleteShortenLink)

export default router