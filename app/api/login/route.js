// app/api/login/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    let isMatch;

    // Check if the password is already hashed
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
      // Password is hashed, use bcrypt to compare
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Password is plain text, do a direct comparison
      isMatch = password === user.password;

      // If match, hash the password and update the user
      if (isMatch) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );
      }
    }

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
