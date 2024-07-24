import connectMongoDB from "@/libs/mongodb";
import Sportsman from "@/models/Sportsman";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newCode: code,
    newName: name,
    newSurname1: surname1,
    newSurname2: surname2,
    newFootballName: footballName,
  } = await request.json();
  await connectMongoDB();
  await Sportsman.findByIdAndUpdate(id, {
    code,
    name,
    surname_1: surname1,
    surname_2: surname2,
    football_name: footballName,
  });
  return NextResponse.json({ message: "Sportsman updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const sportsman = await Sportsman.findOne({ _id: id });
  return NextResponse.json({ sportsman }, { status: 200 });
}
