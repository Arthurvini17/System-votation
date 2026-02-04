"use client";

import React, { useState } from "react";
import { Candidate } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { Button } from "./ui/Button";

interface CandidateCardProps {
    candidate: Candidate;
    onVote: (id: string) => Promise<void>;
}

export function CandidateCard({ candidate, onVote }: CandidateCardProps) {
    const [isVoting, setIsVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = async () => {
        setIsVoting(true);
        try {
            await onVote(candidate.id);
            setHasVoted(true);
        } catch (error) {
            console.error("Failed to vote:", error);
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 flex flex-col h-full">
            <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                {/* In a real app, use Next.js Image component */}
                <img
                    src={candidate.imageUrl}
                    alt={candidate.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                    {candidate.party}
                </div>
            </div>

            <CardHeader>
                <h3 className="text-xl font-bold leading-none tracking-tight">{candidate.name}</h3>
                {candidate.voteCount !== undefined && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        {candidate.voteCount.toLocaleString()} votes
                    </p>
                )}
            </CardHeader>

            <CardContent className="flex-grow">
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {candidate.description}
                </p>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={handleVote}
                    disabled={hasVoted}
                    isLoading={isVoting}
                    className={`w-full ${hasVoted ? 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-700' : ''}`}
                >
                    {hasVoted ? "Voted Successfully" : "Vote for Candidate"}
                </Button>
            </CardFooter>
        </Card>
    );
}
