import { NextResponse } from "next/server";
import { voteService } from "@/services/voteService";

export const voteController = {
  async create(req: Request, user: any) {
    try {
      const body = await req.json();

      const vote = await voteService.createVote({
        userId: user.id,
        candidateId: body.candidateId,
      });

      return NextResponse.json(vote);
    } catch (err: any) {
      if (err.message === "USER_ALREADY_VOTED") {
        return NextResponse.json(
          { error: "USER_ALREADY_VOTED" },
          { status: 409 }
        );
      }

      if (err.message === "CANDIDATE_NOT_FOUND") {
        return NextResponse.json(
          { error: "CANDIDATE_NOT_FOUND" },
          { status: 404 }
        );
      }

      console.error("Erro ao criar voto:", err);
      return NextResponse.json(
        { error: "Erro interno ao registrar voto" },
        { status: 500 }
      );
    }
  },
};
