import { NextResponse } from "next/server";
import { voteService } from "@/services/voteService";


export const voteController = {
  async create(req: Request, user: any) {
    const body = await req.json();


    const vote = await voteService.createVote({
      userId: user.id,
      candidateId: body.candidateId,

    });

    return NextResponse.json(vote);
  }
}