"use client";

import React, { useEffect, useState } from "react";
import { Candidate } from "@/lib/mock-data";
import { votingService } from "@/services/voting";
import { CandidateCard } from "./CandidateCard";

export function VotingGrid() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadCandidates() {
            try {
                const data = await votingService.getCandidates();
                setCandidates(data);
            } catch (error) {
                console.error("Failed to load candidates:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadCandidates();
    }, []);

    const handleVote = async (id: string) => {
        await votingService.submitVote(id);
        // In a real app, we might update the UI optimistically or refetch
        console.log(`Voted for ${id}`);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-96 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {candidates.map((candidate) => (
                <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onVote={handleVote}
                />
            ))}
        </div>
    );
}
