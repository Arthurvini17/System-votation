import { NextResponse } from "next/server";
import { candidateService } from "@/services/candidateService";

export const candidateController = {
  async getAll() {
    const candidates = await candidateService.getAllCandidates();
    return NextResponse.json(candidates);
  },

  async create(req: Request) {
    const { votes, name } = await req.json();
    const candidate = await candidateService.createCandidate({
      name,
      votes,
    });
    return NextResponse.json(candidate);
  },

  async delete(id: number) {
    if (!id || isNaN(Number(id))){
      return NextResponse.json({error: "Id invalido ou não informado"}, {status: 400},)
    }
    
    try {
      const deletedCandidated = await candidateService.deleteCandidate(id);
      return NextResponse.json({message: "Candidato deletado com sucesso", candidated: deletedCandidated})
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        {error: "usuario não encontrado ou id invalido"}, {status: 404},
      )
    }
  }
};
