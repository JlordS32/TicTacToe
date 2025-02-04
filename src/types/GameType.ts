export type PlayerType = "X" | "O" | "";
export type Player = { id: number; type: PlayerType };
export type BoardType = [
   [PlayerType, PlayerType, PlayerType],
   [PlayerType, PlayerType, PlayerType],
   [PlayerType, PlayerType, PlayerType]
];
export type GameState = "playing" | "won" | "draw";
export type GameStatus = {
   player: PlayerType;
   gameState: GameState;
   winner: PlayerType | null;
};
