import { useEffect, useState } from "react";
import {
   BoardType,
   BoardSymbol,
   GameStatus,
   EnemyPlayerType,
   Players,
} from "../../types/GameType";
import styles from "../../styles/modules/Board.module.scss";
import {
   getRandomComputerMove,
   isFullBoard,
} from "../../utils/getRandomComputerMove";
import { handleGameStates } from "../../utils/handleGameStates";
import RetryButton from "../RetryButton";

const COMPUTER_THINKING_TIME = 500;

const initialBoard: BoardType = [
   ["", "", ""],
   ["", "", ""],
   ["", "", ""],
];

type BoardProps = {
   player: BoardSymbol;
   enemyPlayerType?: EnemyPlayerType;
};

const Board = ({
   player,
   enemyPlayerType = "human",
}: BoardProps) => {
   const enemyPlayer = player === "X" ? "O" : "X";
   const [currentPlayer, setCurrentPlayer] = useState<Players>();
   const [board, setBoard] = useState<BoardType>(initialBoard);
   const [gameStatus, setGameStatus] = useState<GameStatus>();
   const [computerThinking, setComputerThinking] = useState<boolean>(false);

   // Player Move
   function handleClick(rowIndex: number, cellIndex: number): void {
      if (
         gameStatus?.gameState === "won" ||
         board[rowIndex][cellIndex] !== "" ||
         computerThinking
      )
         return;

      // Update board
      const newBoard: BoardType = [...board];
      newBoard[rowIndex][cellIndex] =
         currentPlayer === 1 ? player : enemyPlayer;

      // Update state
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      const status = handleGameStates(
         newBoard,
         currentPlayer === 1 ? player : enemyPlayer
      );
      setGameStatus(status);
   }

   function emptyBoard(): void {
      setBoard([
         ["", "", ""],
         ["", "", ""],
         ["", "", ""],
      ]);
      setCurrentPlayer(1);
      setGameStatus(undefined); // Reset game state
   }

   // Computer Move
   useEffect(() => {
      if (enemyPlayerType === "human") return;

      if (
         gameStatus?.gameState === "won" ||
         isFullBoard(board) ||
         currentPlayer === 1
      )
         return;
      if (currentPlayer === 2) {
         setComputerThinking(true);
         setTimeout(() => {
            // Get computer move
            const computerMoveBoard = getRandomComputerMove(board, enemyPlayer);

            // Update state
            setBoard(computerMoveBoard);
            setCurrentPlayer(1);
            const status = handleGameStates(computerMoveBoard, enemyPlayer);
            setGameStatus(status);
            setComputerThinking(false);
         }, COMPUTER_THINKING_TIME);
      }
   }, [currentPlayer]);

   // Set starting player
   useEffect(() => {
      setGameStatus(handleGameStates(board, player));

      if (player === "X") setCurrentPlayer(1);
      if (player === "O") {
         setCurrentPlayer(2);
      }
   }, []);

   useEffect(() => {
      console.log(board);
   }, [board]);

   return (
      <div className={styles.boardContainer}>
         <div className={styles.header}>
            <div>
               <img src="/images/logo.svg" alt="Logo" />
            </div>
            <div className={styles.turn}>
               {currentPlayer === 1 ? (
                  <svg
                     width="64"
                     height="64"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 64 64"
                  >
                     <path
                        d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                        fill="currentColor"
                     />
                  </svg>
               ) : (
                  <svg
                     width="64"
                     height="64"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 64 64"
                  >
                     <path
                        d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                        fill="currentColor"
                     />
                  </svg>
               )}
               <h4>Turn</h4>
            </div>
            <div className={styles.retry}>
               <RetryButton onClick={emptyBoard} />
            </div>
         </div>
         <div className={styles.board}>
            {board.map((row, rowIndex) =>
               row.map((cell, cellIndex) => (
                  <div
                     key={cellIndex}
                     className={styles.cell}
                     onClick={() => handleClick(rowIndex, cellIndex)}
                  >
                     {cell === "X" && <img src="/images/icon-x.svg" alt="X" />}
                     {cell === "O" && <img src="/images/icon-o.svg" alt="O" />}
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

export default Board;
