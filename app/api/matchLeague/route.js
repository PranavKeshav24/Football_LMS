import connectMongoDB from "@/libs/mongodb";
import MatchLeague from "@/models/MatchLeague";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { competition_name, tier, group, week } = await request.json();
  await connectMongoDB();
  await MatchLeague.create({ competition_name, tier, group, week });
  return NextResponse.json(
    { message: "Match League Created" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const matchLeagues = await MatchLeague.find();
  return NextResponse.json({ matchLeagues }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await MatchLeague.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Match League deleted" },
    { status: 200 }
  );
}
