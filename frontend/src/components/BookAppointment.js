import { useEffect, useState } from "react";
import axios from "axios";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !selectedDoctor || !date) {
      setMessage("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments", {
        patientName,
        doctorId: selectedDoctor,
        date,
      });
      setMessage("Appointment booked successfully!");
      setPatientName("");
      setSelectedDoctor("");
      setDate("");
    } catch (error) {
      console.error(error);
      setMessage("Error booking appointment.");
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </div>
        <div>
          <label>Select Doctor:</label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">--Select--</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}
