import { useEffect, useState } from "react";
import axios from "axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map(appt => (
          <li key={appt.id}>
            Patient: {appt.patientName} | Doctor ID: {appt.doctorId} | Date: {appt.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
