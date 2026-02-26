// controllers/voteController.ts

import { NextResponse } from "next/server";
import { voteService } from "@/services/voteService";

export const voteController = {

  create: async (req: Request) => {
    try {
      const body = await req.json();
      const { userId, candidateId } = body;

      if (!userId || !candidateId) {
        return NextResponse.json(
          { message: "Dados obrigatórios não informados" },
          { status: 400 }
        );
      }

      const vote = await voteService.createVote(
        Number(userId),
        Number(candidateId)
      );

      return NextResponse.json(
        {
          message: "Voto registrado com sucesso",
          vote,
        },
        { status: 201 }
      );

    } catch (err) {
        return NextResponse.json(
          { message: "Erro ao registrar voto", error: err },
          { status: 500 }
        );
    
    }
  }

};