import prisma from "@/lib/prisma";

export const candidateService = {

  async getCandidateById(id: number) {
    return await prisma.candidate.findUnique({
      where: {id},
      include: {
        votesReceived: true,
      },
    });
  },  
  
  async getAllCandidates() {
    return await prisma.candidate.findMany({
      include: {
        votesReceived: true,
      },
    });
  },

  async createCandidate(data: { name: string; votes?: number; description: string }) {
  return prisma.candidate.create({
    data: {
      ...data,
    },
  });
  },

  async deleteCandidate(id: number) {
    return await prisma.candidate.delete({
      where: { id },
    });
},

async updateCandidate(id: number, data: { name: string, description: string }) {  
  return await prisma.candidate.update({
    where: { id },
    data: {
      ...data
    }
  });
},
};
