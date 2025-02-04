import { BoardType, GameStatus, PlayerType } from "../types/GameType";

export const handleGameStates = (board: BoardType[][], player: PlayerType): GameStatus => {
   // Check rows
   for (let i = 0; i < 3; i++) {
      if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
         return { player, gameState: "won", winner: board[i][0] as PlayerType };
      }
   }

   // Check columns
   for (let i = 0; i < 3; i++) {
      if (board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
         return { player, gameState: "won", winner: board[0][i] as PlayerType };
      }
   }

   // Check diagonals
   if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return { player, gameState: "won", winner: board[0][0] as PlayerType };
   }
   if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return { player, gameState: "won", winner: board[0][2] as PlayerType };
   }

   // Check for a draw
   if (board.every((row) => row.every((cell) => cell !== ""))) {
      return { player, gameState: "draw", winner: null };
   }

   // Game is still ongoing
   return { player, gameState: "playing", winner: null };
};
