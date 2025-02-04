import { useState, useEffect } from "react";
import {
   BoardType,
   PlayerType,
   GameStatus,
   Player,
} from "../../types/GameType";
import styles from "../../styles/modules/Board.module.scss";
import { handleGameStates } from "../../utils/handleGameStates";
import TicTacToe from "../../utils/class/Tictactoe";

const Board = ({ startingPlayer = 1 }: { startingPlayer: Player }) => {
   const [game, setGame] = useState<TicTacToe>(new TicTacToe(startingPlayer));
   const { board, player, enemyPlayer } = game;
   const [currentPlayer, setCurrentPlayer] = useState<Player>(startingPlayer);

   function handleClick(rowIndex: number, cellIndex: number): void {
      if (board[rowIndex][cellIndex] !== "") return;

      const newBoard: BoardType = [...board];
      newBoard[rowIndex][cellIndex] = currentPlayer.type;

      updateGame(newBoard);
      setCurrentPlayer(currentPlayer.id=== 1 ? 2 : 1);
   }

   function updateGame(newBoard: BoardType) {
      setGame({ ...game, board: newBoard });
   }

   // Check game status each time board is update
   useEffect(() => {
      console.log(game.board);
   }, []);

   return (
      <div className={styles.board}>
         {board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
               <div
                  key={cellIndex}
                  className={styles.cell}
                  onClick={() => handleClick(rowIndex, cellIndex)}
               >
                  {cell}
               </div>
            ))
         )}
      </div>
   );
};

export default Board;
