import { useEffect, useState } from "react";
import { BoardType, BoardSymbol, GameStatus } from "../../types/GameType";
import styles from "../../styles/modules/Board.module.scss";
import {
   getRandomComputerMove,
   isFullBoard,
} from "../../utils/getRandomComputerMove";
import { handleGameStates } from "../../utils/handleGameStates";

const COMPUTER_THINKING_TIME = 500;

const initialBoard: BoardType = [
   ["", "", ""],
   ["", "", ""],
   ["", "", ""],
];

type Players = 1 | 2;
type EnemyPlayerType = "human" | "computer";

type BoardProps = {
   player: BoardSymbol;
   enemyPlayer: BoardSymbol;
   enemyPlayerType?: EnemyPlayerType;
};

const Board = ({
   player,
   enemyPlayer,
   enemyPlayerType = "human",
}: BoardProps) => {
   const [currentPlayer, setCurrentPlayer] = useState<Players>();
   const [board, setBoard] = useState<BoardType>(initialBoard);
   const [gameStatus, setGameStatus] = useState<GameStatus>();
   const [computerThinking, setComputerThinking] = useState<boolean>(false);

   // Player Move
   function handleClick(rowIndex: number, cellIndex: number): void {
      if (gameStatus?.gameState === "won" || board[rowIndex][cellIndex] !== "" || computerThinking)
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
            const status = handleGameStates(computerMoveBoard, player);
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
