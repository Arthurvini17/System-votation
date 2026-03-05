import { NextResponse } from "next/server";
import { candidateService } from "@/services/candidateService";

export const candidateController = {


  async getById(id: number) {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Id invalido ou não informado" },
        { status: 400 },
      );
    }
    try {
      const candidate = await candidateService.getCandidateById(id);
      if (!candidate) {
        return NextResponse.json(
          { error: "Candidato não encontrado" },
          { status: 404 },
        );
      }
      return NextResponse.json(candidate);
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Erro ao buscar candidato", err },
        { status: 500 },
      );
    }
  },
  async getAll() {
    const candidates = await candidateService.getAllCandidates();
    return NextResponse.json(candidates);
  },

  async create(req: Request) {
    if (!req.body) {
      return NextResponse.json(
        { error: "Dados do candidato não informados" },
        { status: 400 },
      );
    }
    try {
      const { votes, name, description } = await req.json();
      const candidate = await candidateService.createCandidate({
        name,
        votes,
        description,
      });
      return NextResponse.json(candidate);
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Erro ao criar candidato" },
        { status: 500 },
      );
    }
  },


  async delete(id: number) {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Id invalido ou não informado" },
        { status: 400 },
      );
    }

    try {
      const deletedCandidated = await candidateService.deleteCandidate(id);
      return NextResponse.json({
        message: "Candidato deletado com sucesso",
        candidated: deletedCandidated,
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "usuario não encontrado ou id invalido" },
        { status: 404 },
      );
    }
  },



  async update(id: number, req: Request) {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Id invalido ou não informado" },
        { status: 400 },
      );
    }

    if (!req.body) {
      return NextResponse.json(
        { error: "Dados do candidato não informados" },
        { status: 400 },
      );
    }

    try {
      const { name, description } = await req.json();
      const updatedCandidate = await candidateService.updateCandidate(id, {
        name,
        description,
      });
      return NextResponse.json({
        message: "Candidato atualizado com sucesso",
        candidate: updatedCandidate,
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "usuario não encontrado ou id invalido" },
        { status: 404 },
      );
    }
  },
};
