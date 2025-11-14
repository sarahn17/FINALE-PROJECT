import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Patient from "./models/Patient.js";
import Doctor from "./models/Doctor.js";
import Appointment from "./models/Appointment.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/telemedicine";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.error("MongoDB Connection Error:", err));

const createTestData = async () => {
  try {
    // Clear old test data
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});

    // Hash passwords
    const patientPassword = await bcrypt.hash("123456", 10);
    const doctorPassword = await bcrypt.hash("123456", 10);

    // Create patient
    const patient = await Patient.create({
      name: "Test Patient",
      email: "patient@test.com",
      password: patientPassword,
      age: 30,
      gender: "Female",
      phone: "0712345678"
    });

    // Create doctor
    const doctor = await Doctor.create({
      name: "Dr. Test",
      specialization: "General",
      experience: 5,
      email: "doctor@test.com",
      password: doctorPassword
    });

    // Create appointment
    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      date: new Date("2025-11-20"),
      time: "10:00 AM",
      reason: "General Checkup"
    });

    console.log("✅ Test Data Created Successfully");
    console.log({ patient, doctor, appointment });
    process.exit(0);
  } catch (err) {
    console.error("Error creating test data:", err);
    process.exit(1);
  }
};

createTestData();
