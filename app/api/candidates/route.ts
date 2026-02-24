import { candidateController } from "@/controllers/candidateController";

export async function GET() {
  return candidateController.getAll();
}

export async function POST(req: Request) {
  return candidateController.create(req);
}
