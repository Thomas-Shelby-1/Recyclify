export type LeaderboardEntry = {
    name: string;
    score: number;
  };
  
  export const getMockLeaderboard = (): LeaderboardEntry[] => [
    { name: 'Samarth', score: 120 },
    { name: 'Amey', score: 100 },
    { name: 'Atharva', score: 85 },
    { name: 'Rajvardhan', score: 90 },
  ];
  