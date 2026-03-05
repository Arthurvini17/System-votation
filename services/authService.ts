import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";

const authService = {
    async login(data: { email: string; password: string }) {
        const { email, password } = data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) throw new Error("Invalid credentials");

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new Error("Invalid credentials");

        const token = generateToken({
            id: user.id,
            email: user.email,
        });

        return { token };
    },
};

export default authService;