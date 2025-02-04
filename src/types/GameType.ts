export type PlayerType = "X" | "O";
export type BoardType = PlayerType | "";
export type GameState = "playing" | "won" | "draw";
export type GameStatus = {
   player: PlayerType;
   gameState: GameState;
   winner: PlayerType | null;
};
