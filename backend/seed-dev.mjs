import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Doctor from "./models/docotor.model.js";

const seedPassword = process.env.SEED_DOCTOR_PASSWORD;

if (!seedPassword) {
  console.error(
    "SEED_DOCTOR_PASSWORD is not set. Provide a demo password before running this script."
  );
  process.exit(1);
}

const password = await bcrypt.hash(seedPassword, 10);

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    email: "sarah@example.com",
    speciality: "General physician",
    degree: "MBBS, MD",
    experience: "8 Years",
    about:
      "Dr. Sarah Mitchell is a dedicated general physician with 8 years of experience in diagnosing and treating a wide range of health conditions.",
    fees: 50,
    address: { line1: "12 Oak Street", line2: "Springfield" },
  },
  {
    name: "Dr. James Carter",
    email: "james@example.com",
    speciality: "Gynecologist",
    degree: "MBBS, MS",
    experience: "10 Years",
    about:
      "Dr. James Carter specializes in women's health and has helped thousands of patients with compassionate, evidence-based care.",
    fees: 70,
    address: { line1: "45 Maple Avenue", line2: "Springfield" },
  },
  {
    name: "Dr. Emily Chen",
    email: "emily@example.com",
    speciality: "Dermatologist",
    degree: "MBBS, MD (Dermatology)",
    experience: "6 Years",
    about:
      "Dr. Emily Chen treats skin, hair and nail conditions with a focus on long-term skin health and minimally invasive procedures.",
    fees: 60,
    address: { line1: "8 Cedar Lane", line2: "Springfield" },
  },
  {
    name: "Dr. Michael Brown",
    email: "michael@example.com",
    speciality: "Pediatricians",
    degree: "MBBS, DCH",
    experience: "12 Years",
    about:
      "Dr. Michael Brown is a pediatrician who cares for infants, children and adolescents with a gentle and family-centered approach.",
    fees: 55,
    address: { line1: "23 Birch Road", line2: "Springfield" },
  },
];

await mongoose.connect(process.env.MONGOOSE_URL);

for (const doc of doctors) {
  const exists = await Doctor.findOne({ email: doc.email });
  if (exists) {
    console.log("Skipping existing:", doc.email);
    continue;
  }
  await Doctor.create({
    ...doc,
    password,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      doc.name.replace("Dr. ", "")
    )}&background=0D8ABC&color=fff&size=256`,
    available: true,
    date: Date.now(),
  });
  console.log("Seeded:", doc.name);
}

console.log("Doctor count:", await Doctor.countDocuments());
await mongoose.disconnect();
