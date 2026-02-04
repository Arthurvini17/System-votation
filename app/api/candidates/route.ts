import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const candidates = await prisma.candidate.findMany({
    include: {
      votesReceived: true,
    },
  });

  return NextResponse.json(candidates);
}

export async function POST(req: Request) {
  const { votes, name } = await req.json();
  const candidate = await prisma.candidate.create({
    data: {
      name,
      votes,
    },
  });
  return NextResponse.json(candidate);
}
