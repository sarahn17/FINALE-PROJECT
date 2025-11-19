let doctors = [
  { id: 1, name: "Dr. James Otieno", specialization: "Cardiology" },
  { id: 2, name: "Dr. Mercy Wanjiku", specialization: "Dermatology" }
];

export const getDoctors = (req, res) => res.json(doctors);

export const addDoctor = (req, res) => {
  const { name, specialization } = req.body;
  if (!name || !specialization) return res.status(400).json({ message: "All fields required" });

  const newDoctor = { id: doctors.length + 1, name, specialization };
  doctors.push(newDoctor);
  res.status(201).json(newDoctor);
};
