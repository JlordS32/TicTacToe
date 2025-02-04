import { BoardType, PlayerType } from "../../types/GameType";

abstract class Algorithm {
   player: PlayerType;
   enemyPlayer: PlayerType;
   board: BoardType;

   constructor(player: PlayerType, board: BoardType) {
      if (new.target === Algorithm) {
         throw new Error("Cannot instantiate abstract class");
      }

      this.player = player;
      this.enemyPlayer = player === "X" ? "O" : "X";
      this.board = board;
   }

   useAlgorithm(): void {
      throw new Error("Method not implemented");
   }
}

export default Algorithm;