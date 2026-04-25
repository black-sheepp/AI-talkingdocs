import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Message from "@/models/Message";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.json({ error: "Missing documentId" }, { status: 400 });
    }

    await connectToDatabase();
    const history = await Message.find({ documentId }).sort({ createdAt: 1 });

    return NextResponse.json(history);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
