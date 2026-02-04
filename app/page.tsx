import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-12 px-6 text-center space-y-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-7xl">
            Secure<span className="text-blue-600 dark:text-blue-500">Vote</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            A modern, transparent, and secure voting platform for the next generation of leaders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm mx-auto">
          <Link href="/vote" className="w-full">
            <Button size="lg" className="w-full text-lg h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              Start Voting
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full text-lg h-14">
            Learn More
          </Button>
        </div>

        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
          <Feature
            title="Secure"
            description="End-to-end encryption ensures your vote remains private and tamper-proof."
          />
          <Feature
            title="Transparent"
            description="Real-time auditing and open-source verifyability for complete trust."
          />
          <Feature
            title="Accessible"
            description="Vote from anywhere, on any device, with our fully responsive interface."
          />
        </div>
      </main>
    </div>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}
