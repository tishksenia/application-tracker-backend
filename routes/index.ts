import express from "express";
import { categoriesRouter } from "./categories";

const router = express.Router();

router.use("/categories", categoriesRouter);

export { router as rootRouter };
