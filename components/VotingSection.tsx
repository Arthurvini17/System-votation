"use client";

import React, { useEffect, useState } from "react";
import { Candidate } from "@/lib/mock-data";
import { CandidateCard } from "./CandidateCard";

export function VotingGrid() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCandidates() {
      const res = await fetch("/api/candidates");
      const data = await res.json();
      setCandidates(data);
      setIsLoading(false);
    }

    loadCandidates();
  }, []);

  const handleVote = async (id: string) => {
    await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    console.log(`Voted for ${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 gap-6">
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