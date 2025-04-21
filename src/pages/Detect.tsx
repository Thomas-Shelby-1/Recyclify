import { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
// @ts-ignore
import confetti from 'canvas-confetti';

export default function Detect() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const detectionInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [label, setLabel] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [lastDetected, setLastDetected] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [scanning, setScanning] = useState(true);

  const { addPoints, score } = useApp();

  const wasteMap: Record<string, { type: string; tip: string }> = {
    bottle: { type: 'Recyclable', tip: 'Put it in the blue bin.' },
    banana: { type: 'Organic', tip: 'Compost this in green bin.' },
    strawberry: { type: 'Organic', tip: 'Compost this in green bin.' },
    cup: { type: 'Non-recyclable', tip: 'Dispose in red bin.' },
    mobile: { type: 'E-Waste', tip: 'Put it in the e-waste center.' },
    'cell phone': { type: 'E-Waste', tip: 'Put it in the e-waste center.' },
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  useEffect(() => {
    let model: cocoSsd.ObjectDetection;

    const detect = async () => {
      if (!scanning || !videoRef.current || !model) return;

      const predictions = await model.detect(videoRef.current);
      if (predictions.length === 0) return;

      const top = predictions[0];
      if (top.score < 0.7 || top.class === 'person' || top.class === lastDetected) return;

      setLabel(top.class);
      setConfidence(top.score);
      setLastDetected(top.class);
      addPoints(5);
      toast.success('+5 Eco Points');
      setHistory((prev) => [top.class, ...prev.slice(0, 4)]);
      setScanning(false);

      confetti({ particleCount: 100, spread: 70 });
    };

    const runObjectDetection = async () => {
      model = await cocoSsd.load();
      console.log('COCO model loaded');

      detectionInterval.current = setInterval(detect, 1500);
    };

    runObjectDetection();

    return () => {
      if (detectionInterval.current) clearInterval(detectionInterval.current);
    };
  }, [scanning, lastDetected]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start justify-center w-full px-4 gap-6">
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-3xl font-bold mb-4">🎯 Object Detection</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute top-0 left-0 w-full h-full rounded-xl border-4 border-green-400 animate-pulse z-0"></div>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full max-w-2xl h-auto rounded-xl border border-gray-300 shadow-xl mb-6 z-10"
            />
          </motion.div>

          {label && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md p-4 rounded shadow text-center max-w-md w-full"
            >
              <p className="text-xl font-semibold text-gray-800">Detected: {label}</p>
              <p className="text-sm text-gray-600">
                Confidence: {(confidence * 100).toFixed(2)}%
              </p>
              {wasteMap[label] && (
                <p className="mt-2 text-green-700 text-sm">
                  Category: {wasteMap[label].type} — {wasteMap[label].tip}
                </p>
              )}
            </motion.div>
          )}

          {!scanning && (
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                setScanning(true);
                setLastDetected('');
              }}
            >
              🔄 Scan Again
            </button>
          )}
        </div>

        <div className="w-full md:w-64 mt-10 md:mt-0 bg-white/80 backdrop-blur-md rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">🕘 Recent Scans</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {history.length === 0 ? (
              <li className="text-gray-400 italic">No history yet.</li>
            ) : (
              history.map((item, i) => <li key={i}>• {item}</li>)
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
