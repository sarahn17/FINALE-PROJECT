import express from "express";
import Appointment from "../models/appointment.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

// BOOK APPOINTMENT (logged-in patient)
router.post("/book", protect, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;
    if (!doctor || !date || !time || !reason) return res.status(400).json({ message: "All fields required" });

    const appointment = await Appointment.create({
      patient: req.patient.id,
      doctor,
      date,
      time,
      reason,
      status: "pending"
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET ALL APPOINTMENTS
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE APPOINTMENT STATUS (approve/reject)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // "approved" or "rejected"
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.json({ message: `Appointment ${status}`, appointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
