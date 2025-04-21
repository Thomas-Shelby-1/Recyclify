import { motion } from 'framer-motion';

interface Props {
  label: string;
  confidence: number;
}

const categoryEmojis: Record<string, string> = {
  Recyclable: '♻️',
  Organic: '🍃',
  'E-Waste': '🔋',
  'Non-recyclable': '🚫',
};

export default function ResultCard({ label, confidence }: Props) {
  const percent = (confidence * 100).toFixed(1);
  const barColor =
    confidence > 0.85
      ? 'bg-green-500'
      : confidence > 0.6
        ? 'bg-yellow-400'
        : 'bg-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        {categoryEmojis[label] || '🤖'} {label}
      </h3>

      <div className="mt-4 w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <motion.div
          className={`h-4 ${barColor}`}
          style={{ width: `${percent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <p className="text-sm mt-2 text-gray-600 font-medium">
        Confidence: {percent}%
      </p>
    </motion.div>
  );
}
