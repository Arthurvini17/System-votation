"use client";

import React, { useState } from "react";
import { Candidate } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { Button } from "./ui/Button";

interface CandidateCardProps {
    candidate: Candidate;
    onVote: (id: number) => Promise<void>;
    hasVoted: boolean;
    isVotedCandidate: boolean;
}

export function CandidateCard({ candidate, onVote, hasVoted, isVotedCandidate }: CandidateCardProps) {
    const [isVoting, setIsVoting] = useState(false);
    const [error, setError] = useState("");

    // Contagem de votos: usa _count se disponível, senão conta o array
    const voteCount = candidate._count?.votesReceived ?? candidate.votesReceived?.length ?? 0;

    // Avatar gerado dinamicamente baseado no nome do candidato
    const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(candidate.name)}&backgroundColor=3b82f6,6366f1,8b5cf6,a855f7,ec4899&backgroundType=gradientLinear`;

    const handleVote = async () => {
        setIsVoting(true);
        setError("");
        try {
            await onVote(candidate.id);
        } catch (err) {
            console.error("Falha ao votar:", err);
            setError("Erro ao registrar voto. Tente novamente.");
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 flex flex-col h-full">
            <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                <img
                    src={avatarUrl}
                    alt={candidate.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Badge de votos */}
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0H16.5a2.25 2.25 0 0 1 2.25 2.25c0 .414-.168.79-.44 1.06a2.25 2.25 0 0 1-.12 3.56 2.25 2.25 0 0 1-1.69 3.44h-.94c-1.09 0-2.15-.363-3.006-1.034a3.75 3.75 0 0 0-2.174-.689H5.25" />
                    </svg>
                    <span>{voteCount.toLocaleString()}</span>
                </div>

                {/* Indicador de que votou nesse candidato */}
                {isVotedCandidate && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Seu voto
                    </div>
                )}
            </div>

            <CardHeader>
                <h3 className="text-xl font-bold leading-none tracking-tight">{candidate.name}</h3>
            </CardHeader>

            <CardContent className="flex-grow">
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {candidate.description}
                </p>
                {error && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
                )}
            </CardContent>

            <CardFooter>
                <Button
                    onClick={handleVote}
                    disabled={hasVoted}
                    isLoading={isVoting}
                    className={`w-full ${isVotedCandidate
                            ? "bg-green-600 hover:bg-green-700 text-white dark:bg-green-700"
                            : hasVoted
                                ? "opacity-50"
                                : ""
                        }`}
                >
                    {isVotedCandidate
                        ? "✓ Voto Registrado"
                        : hasVoted
                            ? "Você já votou"
                            : "Votar neste Candidato"}
                </Button>
            </CardFooter>
        </Card>
    );
}
