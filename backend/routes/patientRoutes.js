import express from "express";
import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER PATIENT
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, gender, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) return res.status(400).json({ message: "Patient already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = await Patient.create({
      name, email, password: hashedPassword, age, gender, phone
    });

    res.status(201).json({ message: "Patient registered successfully", data: newPatient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// LOGIN PATIENT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ message: "Patient not found" });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: patient._id, role: "patient" }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.json({ message: "Login successful", token, patient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET ALL PATIENTS
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
