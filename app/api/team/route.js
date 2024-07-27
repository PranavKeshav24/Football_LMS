import connectMongoDB from "@/libs/mongodb";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, badge, is_home, is_away } = await request.json();
  await connectMongoDB();
  await Team.create({ name, badge, is_home, is_away });
  return NextResponse.json({ message: "Team Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const teams = await Team.find();
  return NextResponse.json({ teams }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Team.findByIdAndDelete(id);
  return NextResponse.json({ message: "Team deleted" }, { status: 200 });
}
