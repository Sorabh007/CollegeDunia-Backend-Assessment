import express from "express";
import { register, getdata, getdata_id, updatedata_id, deletebook_id } from "../Backend/controller/book.controller.js";

const router = express.Router();

router.route("/").post(register);
router.route("/").get(getdata);
router.route("/:id").get(getdata_id);
router.route("/:id").put(updatedata_id);
router.route("/:id").delete(deletebook_id);

export default router;