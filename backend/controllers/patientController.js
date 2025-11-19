let patients = [];

export const registerPatient = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const exists = patients.find(p => p.email === email);
  if (exists) return res.status(400).json({ message: "Email already registered" });

  const newPatient = { id: patients.length + 1, name, email };
  patients.push(newPatient);
  res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
};

export const loginPatient = (req, res) => {
  const { email } = req.body;
  const patient = patients.find(p => p.email === email);
  if (!patient) return res.status(400).json({ message: "Patient not found" });

  res.json({ message: "Login successful", patient });
};
