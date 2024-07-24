import connectMongoDB from "@/libs/mongodb";
import City from "@/models/City";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, code, province, state, country } = await request.json();
  await connectMongoDB();
  await City.create({ name, code, province, state, country });
  return NextResponse.json({ message: "City Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const cities = await City.find();
  return NextResponse.json({ cities }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await City.findByIdAndDelete(id);
  return NextResponse.json({ message: "City deleted" }, { status: 200 });
}
