// pages/api/register.js
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await connectMongoDB();

  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
