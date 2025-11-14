import express from "express";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER DOCTOR
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, specialization, phone, experience } = req.body;

    if (!name || !email || !password || !specialization || !experience) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      phone,
      experience,
    });

    res.status(201).json({ message: "Doctor registered successfully", data: newDoctor });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// LOGIN DOCTOR
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.json({ message: "Login successful", token, doctor });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET ALL DOCTORS
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
