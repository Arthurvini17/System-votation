import { Candidate, MOCK_CANDIDATES } from "@/lib/mock-data";

/**
 * Service to handle voting operations.
 * Currently uses mock data, but is structured to easily swap with real API calls.
 */
export const votingService = {
    /**
     * Fetches the list of candidates.
     * Replace this with a fetch call to your backend.
     */
    async getCandidates(): Promise<Candidate[]> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return [...MOCK_CANDIDATES];
    },

    /**
     * Submits a vote for a candidate.
     * Replace this with a POST request to your backend.
     */
    async submitVote(candidateId: string): Promise<void> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log(`Vote submitted for candidate ID: ${candidateId}`);

        // In a real app, you might invalidate cache or refetch data here
    }
};
