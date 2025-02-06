import { useEffect, useState } from "react";
import { BoardType, BoardSymbol } from "../../types/GameType";
import styles from "../../styles/modules/Board.module.scss";
import {
   getRandomComputerMove,
   isFullBoard,
} from "../../utils/getRandomComputerMove";

const COMPUTER_THINKING_TIME = 500;

const initialBoard: BoardType = [
   ["", "", ""],
   ["", "", ""],
   ["", "", ""],
];

type Players = 1 | 2;

type BoardProps = {
   player: BoardSymbol;
   enemyPlayer: BoardSymbol;
};

const Board = ({ player, enemyPlayer }: BoardProps) => {
   const [currentPlayer, setCurrentPlayer] = useState<Players>();
   const [board, setBoard] = useState<BoardType>(initialBoard);

   // Player Move
   function handleClick(rowIndex: number, cellIndex: number): void {
      if (board[rowIndex][cellIndex] !== "" || currentPlayer === 2) return;

      const newBoard: BoardType = [...board];
      newBoard[rowIndex][cellIndex] = player;
      setBoard(newBoard);
      setCurrentPlayer(2);
   }

   // Computer Move
   useEffect(() => {
      if (isFullBoard(board) || currentPlayer === 1) return;
      
      if (currentPlayer === 2) {
         setTimeout(() => {
            const computerMoveBoard = getRandomComputerMove(board, enemyPlayer);
            setBoard(computerMoveBoard);
            setCurrentPlayer(1);
         }, COMPUTER_THINKING_TIME);
      }
   }, [currentPlayer]);

   // Set starting player
   useEffect(() => {
      if (player === "X") setCurrentPlayer(1);
      if (player === "O") {
         setCurrentPlayer(2);
      }
   }, []);

   return (
      <div className={styles.boardContainer}>
         <h1>Player: {currentPlayer}</h1>
         <div className={styles.board}>
            {board.map((row, rowIndex) =>
               row.map((cell, cellIndex) => (
                  <div
                     key={cellIndex}
                     className={styles.cell}
                     onClick={() => handleClick(rowIndex, cellIndex)}
                  >
                     {cell === "X" && (
                        <img src="/images/icon-x-outline.svg" alt="X" />
                     )}
                     {cell === "O" && (
                        <img src="/images/icon-o-outline.svg" alt="O" />
                     )}
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

export default Board;
