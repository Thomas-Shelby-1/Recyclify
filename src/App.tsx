import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Detect from './pages/Detect';
import Leaderboard from './pages/Leaderboard';
import Assistant from './pages/Assistant';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'sonner'; // ✅ import this
import ConfettiTest from './pages/ConfettiTest';
<Route path="/confetti" element={<ConfettiTest />} />

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </AppProvider>
  );
}
