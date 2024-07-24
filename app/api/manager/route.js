import connectMongoDB from "@/libs/mongodb";
import Manager from "@/models/Manager";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { sportsman, team } = await request.json();
  await connectMongoDB();
  await Manager.create({ sportsman, team });
  return NextResponse.json({ message: "Manager Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const managers = await Manager.find().populate("sportsman").populate("team");
  return NextResponse.json({ managers }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Manager.findByIdAndDelete(id);
  return NextResponse.json({ message: "Manager deleted" }, { status: 200 });
}
