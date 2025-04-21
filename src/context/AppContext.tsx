import { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  score: number;
  addPoints: (pts: number) => void;
}

const AppContext = createContext<AppContextType>({
  score: 0,
  addPoints: () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('eco-score');
    if (saved) setScore(Number(saved));
  }, []);

  const addPoints = (pts: number) => {
    setScore((prev) => {
      const updated = prev + pts;
      localStorage.setItem('eco-score', updated.toString());
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ score, addPoints }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
