import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

export function generateToken(payload: { id: number; email: string }) {
    return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(req: Request) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded as { id: number; email: string };
    } catch {
        return null;
    }
}
