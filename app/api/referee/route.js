import connectMongoDB from "@/libs/mongodb";
import Referee from "@/models/Referee";
import { NextResponse } from "next/server";

// Handle POST request to create a new referee
export async function POST(request) {
  const { name, code } = await request.json();
  await connectMongoDB();
  await Referee.create({ name, code });
  return NextResponse.json({ message: "Referee Created" }, { status: 201 });
}

// Handle GET request to fetch all referees
export async function GET() {
  await connectMongoDB();
  const referees = await Referee.find();
  return NextResponse.json({ referees }, { status: 200 });
}

// Handle DELETE request to delete a referee by id
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Referee.findByIdAndDelete(id);
  return NextResponse.json({ message: "Referee deleted" }, { status: 200 });
}
