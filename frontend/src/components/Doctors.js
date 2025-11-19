import { useEffect, useState } from "react";
import axios from "axios";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

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

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map(doc => (
          <li key={doc.id}>{doc.name} - {doc.specialization}</li>
        ))}
      </ul>
    </div>
  );
}
