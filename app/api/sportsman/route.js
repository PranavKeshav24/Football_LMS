import connectMongoDB from "@/libs/mongodb";
import Sportsman from "@/models/Sportsman";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { code, name, surname1, surname2, footballName } = await request.json();
  await connectMongoDB();
  await Sportsman.create({
    code,
    name,
    surname_1: surname1,
    surname_2: surname2,
    football_name: footballName,
  });
  return NextResponse.json({ message: "Sportsman Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const sportsmen = await Sportsman.find();
  return NextResponse.json({ sportsmen }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Sportsman.findByIdAndDelete(id);
  return NextResponse.json({ message: "Sportsman deleted" }, { status: 200 });
}
