// Tipos compatíveis com o retorno real da API (Prisma)

export interface Vote {
    id: number;
    userId: number;
    candidateId: number;
}

export interface Candidate {
    id: number;
    name: string;
    description: string;
    votesReceived: Vote[];
    _count?: {
        votesReceived: number;
    };
}
