import { useState, useEffect } from "react";
import { BoardType, PlayerType, GameStatus } from "../../types/GameType";
import styles from "../../styles/modules/Board.module.scss";
import { handleGameStates } from "../../handler/handleGameStates";

const Board = () => {
   const [board, setBoard] = useState<BoardType[][]>(
      Array.from({ length: 3 }, () => Array(3).fill("") as BoardType[])
   );
   const [currentPlayer, setCurrentPlayer] = useState<PlayerType>("X");

   function handleClick(rowIndex: number, cellIndex: number): void {
      if (board[rowIndex][cellIndex] !== "") return;

      // Place the player's mark on the board.
      setBoard((prevBoard) => {
         const newBoard = [...prevBoard];
         newBoard[rowIndex][cellIndex] = currentPlayer;
         return newBoard;
      });

      // Toggle player to the next one.
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
   }

   // Check game status each time board is update
   useEffect(() => {
      const gameStatus: GameStatus = handleGameStates(board, currentPlayer);
      console.log(gameStatus);
   }, [board]);

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
