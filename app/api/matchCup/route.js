import connectMongoDB from "@/libs/mongodb";
import MatchCup from "@/models/MatchCup";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { competition_name, edition, round } = await request.json();
  await connectMongoDB();
  await MatchCup.create({ competition_name, edition, round });
  return NextResponse.json({ message: "Match Cup Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const matchCups = await MatchCup.find();
  return NextResponse.json({ matchCups }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await MatchCup.findByIdAndDelete(id);
  return NextResponse.json({ message: "Match Cup deleted" }, { status: 200 });
}
