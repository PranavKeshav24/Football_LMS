import connectMongoDB from "@/libs/mongodb";
import Manager from "@/models/Manager";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  const { id } = params;
  const { sportsman, team } = await request.json();

  if (!sportsman || !team) {
    return NextResponse.json(
      { error: "Sportsman and Team are required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await Manager.findByIdAndUpdate(
      id,
      { sportsman, team },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "Manager not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Manager updated", manager: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating manager: ", error);
    return NextResponse.json(
      { error: "Failed to update manager" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const manager = await Manager.findById(id)
      .populate("sportsman")
      .populate("team");

    if (!manager) {
      return NextResponse.json({ error: "Manager not found" }, { status: 404 });
    }

    return NextResponse.json({ manager }, { status: 200 });
  } catch (error) {
    console.error("Error fetching manager: ", error);
    return NextResponse.json(
      { error: "Failed to fetch manager" },
      { status: 500 }
    );
  }
}
