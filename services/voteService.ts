

import prisma from "@/lib/prisma";

export const voteService = {

  async createVote(userId: number, candidateId: number) {

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new Error("CANDIDATE_NOT_FOUND");
    }

    try {
      const vote = await prisma.vote.create({
        data: {
          userId,
          candidateId,
        },
      });

      return vote;

    } catch (error: any) {

      if (error.code === "P2002") {
        throw new Error("USER_ALREADY_VOTED");
      }

      throw error;
    }
  }
};