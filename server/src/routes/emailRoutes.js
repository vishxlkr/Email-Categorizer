import express from "express";
import {
   getAllEmails,
   seedEmails,
   updateEmailCategory,
   getAccuracy,
} from "../controllers/emailController.js";

const router = express.Router();

router.get("/", getAllEmails);
router.post("/seed", seedEmails);
router.put("/:id", updateEmailCategory);
router.get("/accuracy/stats", getAccuracy);

export default router;
