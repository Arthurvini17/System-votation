
export interface Candidate {
    id: string;
    name: string;
    party: string;
    description: string;
    imageUrl: string;
    voteCount?: number;
}

export const MOCK_CANDIDATES: Candidate[] = [
    {
        id: '1',
        name: 'Alexandra Silva',
        party: 'Progressive Alliance',
        description: 'Advocating for sustainable urban development and digital education reform.',
        imageUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alexandra',
        voteCount: 1240
    },
    {
        id: '2',
        name: 'Marcus Chen',
        party: 'Future Tech Party',
        description: 'Focusing on transparent governance through blockchain technology and AI integration.',
        imageUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marcus',
        voteCount: 980
    },
    {
        id: '3',
        name: 'Sarah Johnson',
        party: 'Green Earth Coalition',
        description: 'Committed to renewable energy transition and protecting local biodiversity contexts.',
        imageUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah',
        voteCount: 1567
    },
    {
        id: '4',
        name: 'David Okafor',
        party: 'Community First',
        description: 'Championing small business growth and community healthcare accessibility.',
        imageUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=David',
        voteCount: 890
    }
];
