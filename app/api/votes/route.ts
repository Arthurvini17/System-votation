import { voteController } from "@/controllers/voteController";

export async function POST(req: Request) {
  return voteController.create(req);
}

