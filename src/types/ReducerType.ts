import { BoardType, BoardSymbol } from "./GameType";

export type State = {
   board: BoardType;
   currentPlayer: BoardSymbol;
   computerThinking: boolean;
   round: number;
   score: {
      x: number;
      o: number;
      ties: number;
   };
};

export type Action =
   | { type: "SET"; field: keyof State; value: State[keyof State] }
   | { type: "RESET" };