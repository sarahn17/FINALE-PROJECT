let appointments = [];

export const getAppointments = (req, res) => res.json(appointments);

export const bookAppointment = (req, res) => {
  const { patientName, doctorId, date } = req.body;
  if (!patientName || !doctorId || !date) return res.status(400).json({ message: "All fields required" });

  const newAppointment = { id: appointments.length + 1, patientName, doctorId, date };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
};
