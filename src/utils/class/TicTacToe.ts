import { BoardType, Player, PlayerType } from "../../types/GameType";

class TicTacToe {
   player: PlayerType;
   enemyPlayer: PlayerType;
   _currentPlayer: Player;
   _board: BoardType = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
   ];

   constructor(player: Player) {
      this.player = player.id === 1 ? "X" : "O";
      this.enemyPlayer = player.id === 1 ? "O" : "X";
      this._currentPlayer = player;
   }

   set board(newBoard: BoardType) {
      this._board = newBoard;
   }

   get board(): BoardType {
      return this._board;
   }
}

export default TicTacToe;
