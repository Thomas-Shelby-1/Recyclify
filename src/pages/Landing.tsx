import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <Layout>
      <div
        className="relative flex flex-col lg:flex-row items-center justify-between gap-10 px-6 py-20 min-h-screen overflow-hidden text-white"
        style={{
          backgroundImage: "url('/leaf-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

        {/* LEFT TEXT SIDE */}
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-5xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Recyclify
            </span>{' '}
            <span className="inline-block">🌱</span>
          </h1>
          <p className="text-xl font-bold text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
  Scan. Sort. Sustain. <span className="text-2xl">♻️</span>
</p>

          <p className="text-white/90 max-w-xl text-base mb-6">
            Real-time waste recognition & eco-guidance powered by AI — use your
            laptop camera and help build a cleaner tomorrow.
          </p>

          <Link
            to="/detect"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg shadow-md transition-transform hover:scale-105 inline-flex items-center gap-2"
          >
            ♻️ Start Scanning Waste
          </Link>
        </div>

        {/* RIGHT ICON CARDS */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 z-10">
          {[
            { name: 'Bottle', src: '/bottle.svg', type: 'Recyclable' },
            { name: 'Strawberry', src: '/strawberry.svg', type: 'Organic' },
            { name: 'Mobile', src: '/mobile.svg', type: 'E-Waste' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.1, rotate: 1 }}
              className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-4 text-center hover:shadow-green-400 transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-20 h-20 mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.type}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
