import { voteController } from "@/controllers/voteController";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return voteController.create(req, user);
}