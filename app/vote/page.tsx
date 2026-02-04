import { VotingGrid } from "@/components/VotingSection";

export default function VotePage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 px-6 py-12 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        Cast Your Vote
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-400">
                        Shape the future by participating in our democratic process.
                        Review the candidates below and make your voice heard.
                    </p>
                </header>

                <main>
                    <VotingGrid />
                </main>

                <footer className="text-center text-sm text-neutral-500 pt-12 border-t border-neutral-200 dark:border-neutral-800">
                    <p>© {new Date().getFullYear()} SecureVote System. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
