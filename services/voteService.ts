import prisma from "@/lib/prisma";

export const voteService = {
  async createVote(data: { userId: number, candidateId: number }) {
    const { userId, candidateId } = data;

    // Verifica se já votou
    const existingVote = await prisma.vote.findUnique({
      where: { userId },
    });

    if (existingVote) {
      throw new Error("USER_ALREADY_VOTED");
    }

    // Verifica se candidato existe
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new Error("CANDIDATE_NOT_FOUND");
    }

    // Cria voto
    return prisma.vote.create({
      data: {
        userId,
        candidateId,
      },
    });
  },
};