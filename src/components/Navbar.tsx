import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // make sure context is hooked up

export default function Navbar() {
  const { score } = useApp(); // 🔥 access eco points

  return (
    <nav className="w-full bg-gray-900 text-white flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-bold">Recyclify</div>

      <div className="flex items-center space-x-6">
        <div className="text-sm text-green-400 font-semibold">
          🌿 Eco Points: <span className="text-white">{score}</span>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/detect" className="hover:text-green-400">Detect</Link>
          <Link to="/leaderboard" className="hover:text-green-400">Leaderboard</Link>
          <Link to="/assistant" className="hover:text-green-400">Assistant</Link>
        </div>
      </div>
    </nav>
  );
}
