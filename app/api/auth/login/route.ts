import { authController } from "@/controllers/authController";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    return authController.login(req);
}