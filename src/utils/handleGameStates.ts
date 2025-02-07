import { BoardType, GameStatus, BoardSymbol } from "../types/GameType";

export const handleGameStates = (
   board: BoardType,
   player: BoardSymbol
): GameStatus => {
   // Check rows
   for (let i = 0; i < 3; i++) {
      if (
         board[i][0] !== "" &&
         board[i][0] === board[i][1] &&
         board[i][1] === board[i][2]
      ) {
         return { player, gameState: "won", winner: board[i][0] as BoardSymbol };
      }
   }

   // Check columns
   for (let i = 0; i < 3; i++) {
      if (
         board[0][i] !== "" &&
         board[0][i] === board[1][i] &&
         board[1][i] === board[2][i]
      ) {
         return { player, gameState: "won", winner: board[0][i] as BoardSymbol };
      }
   }

   // Check diagonals
   if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
   ) {
      return { player, gameState: "won", winner: board[0][0] as BoardSymbol };
   }
   if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
   ) {
      return { player, gameState: "won", winner: board[0][2] as BoardSymbol };
   }

   // Check for a draw
   if (board.every((row) => row.every((cell) => cell !== ""))) {
      return { player, gameState: "draw", winner: null };
   }

   // Game is still ongoing
   return { player, gameState: "playing", winner: null };
};
