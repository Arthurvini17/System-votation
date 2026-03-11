"use client";

import React, { useEffect, useState } from "react";
import { Candidate } from "@/lib/types";
import { CandidateCard } from "./CandidateCard";

export function VotingGrid() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [votedId, setVotedId] = useState<number | null>(null);
  const [voteError, setVoteError] = useState("");

  useEffect(() => {
    async function loadCandidates() {
      try {
        const res = await fetch("/api/candidates");
        if (!res.ok) {
          throw new Error("Erro ao carregar candidatos");
        }
        const data = await res.json();
        setCandidates(data);
      } catch (err) {
        console.error("Erro ao buscar candidatos:", err);
        setError("Não foi possível carregar os candidatos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCandidates();
  }, []);

  const handleVote = async (candidateId: number) => {
    setVoteError("");

    // Pega o token JWT do localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setVoteError("Você precisa estar logado para votar. Faça login primeiro.");
      return;
    }

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ candidateId }),
    });

    if (!res.ok) {
      const data = await res.json();

      if (res.status === 401) {
        setVoteError("Sessão expirada. Faça login novamente.");
        return;
      }

      if (data.error?.includes("USER_ALREADY_VOTED") || data.error?.includes("já votou")) {
        setVoteError("Você já votou! Cada usuário pode votar apenas uma vez.");
        setVotedId(candidateId);
        return;
      }

      throw new Error(data.error || "Erro ao registrar voto");
    }

    setVotedId(candidateId);

    // Recarrega candidatos para atualizar contagem de votos
    const updatedRes = await fetch("/api/candidates");
    if (updatedRes.ok) {
      const updatedData = await updatedRes.json();
      setCandidates(updatedData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Carregando candidatos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <p className="font-medium">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2">
        <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          Nenhum candidato encontrado
        </p>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Ainda não há candidatos cadastrados no sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Vote Error Banner */}
      {voteError && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <span className="text-sm font-medium">{voteError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onVote={handleVote}
            hasVoted={votedId !== null}
            isVotedCandidate={votedId === candidate.id}
          />
        ))}
      </div>
    </div>
  );
}