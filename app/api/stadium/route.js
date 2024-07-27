import connectMongoDB from "@/libs/mongodb";
import Stadium from "@/models/Stadium";
import { NextResponse } from "next/server";

// Handle POST request to create a new stadium
export async function POST(request) {
  const { name, code, city } = await request.json();
  await connectMongoDB();
  await Stadium.create({ name, code, city });
  return NextResponse.json({ message: "Stadium Created" }, { status: 201 });
}

// Handle GET request to fetch all stadiums
export async function GET() {
  await connectMongoDB();
  const stadiums = await Stadium.find().populate("city"); // Assuming you want to populate the city reference
  return NextResponse.json({ stadiums }, { status: 200 });
}

// Handle DELETE request to delete a stadium by id
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Stadium.findByIdAndDelete(id);
  return NextResponse.json({ message: "Stadium deleted" }, { status: 200 });
}
