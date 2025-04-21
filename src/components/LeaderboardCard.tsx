interface LeaderboardCardProps {
    name: string;
    score: number;
}

export default function LeaderboardCard({ name, score }: LeaderboardCardProps) {
    return (
        <div className="flex justify-between items-center bg-white shadow p-4 rounded-md w-full max-w-md">
            <span className="font-medium text-lg">{name}</span>
            <span className="text-green-600 font-bold">{score} pts</span>
        </div>
    );
}