import authService from "@/services/authService";
import { NextResponse } from "next/server";

export const authController = {
    async login(req: Request) {
        const body = await req.json();
        const user = await authService.login(body);
        return NextResponse.json(user);
    }
}