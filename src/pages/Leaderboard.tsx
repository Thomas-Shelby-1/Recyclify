import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

export default function Leaderboard() {
    const { score } = useApp();

    const mockLeaderboard = [
        { name: 'You 👑', points: score },
        { name: 'Aarav', points: 150 },
        { name: 'Diya', points: 120 },
        { name: 'Rohan', points: 90 },
    ];

    const sorted = [...mockLeaderboard].sort((a, b) => b.points - a.points);

    return (
        <Layout>
            <div className="flex flex-col items-center w-full px-4">
                <h2 className="text-3xl font-bold text-green-600 mb-6">
                    🏆 Eco Leaderboard
                </h2>

                <div className="w-full max-w-md space-y-4">
                    {sorted.map((entry, i) => (
                        <motion.div
                            key={entry.name}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-white rounded-xl shadow-md p-4 flex justify-between items-center ${entry.name.includes('You') ? 'border-2 border-green-500' : ''
                                }`}
                        >
                            <span className="font-medium text-gray-700">
                                {i + 1}. {entry.name}
                            </span>
                            <span className="font-bold text-green-700">{entry.points} pts</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
