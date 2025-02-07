export type BoardSymbol = "X" | "O" | "";
export type BoardType = [
   [BoardSymbol, BoardSymbol, BoardSymbol],
   [BoardSymbol, BoardSymbol, BoardSymbol],
   [BoardSymbol, BoardSymbol, BoardSymbol]
];
export type GameState = "playing" | "won" | "draw";
export type GameStatus = {
   player: BoardSymbol;
   gameState: GameState;
   winner: BoardSymbol | null;
};
export type Players = 1 | 2;
export type EnemyPlayerType = "human" | "computer";