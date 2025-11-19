import express from "express";
import { getAppointments, bookAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.post("/", bookAppointment);

export default router;
