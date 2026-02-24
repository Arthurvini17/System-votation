import prisma from "@/lib/prisma";

export const candidateService = {
  async getAllCandidates() {
    return await prisma.candidate.findMany({
      include: {
        votesReceived: true,
      },
    });
  },

  async createCandidate(data: { name: string, votes?: number }) {
    return await prisma.candidate.create({
      data: {
        name: data.name,
      },
    });
  },

  async deleteCandidate(id: number) {
    return await prisma.candidate.delete({
      where: { id },
    });
},

};
