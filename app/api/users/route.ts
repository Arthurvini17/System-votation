import { userController } from "@/controllers/userController";

export async function GET() {
  return userController.getAll();
}

export async function POST(req: Request) {
  return userController.create(req);
}
