// Styles
import styles from "../../styles/modules/Board.module.scss";

// Hooks
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

// Types
import { Action, State } from "../../types/ReducerType";
import { GameType } from "./Game";
import {
   BoardType,
   BoardSymbol,
   GameStatus,
   EnemyPlayerType,
} from "../../types/GameType";

// Utils
import {
   getRandomComputerMove,
   isFullBoard,
} from "../../utils/getRandomComputerMove";
import { handleGameStates } from "../../utils/handleGameStates";

// Components
import RetryButton from "../RetryButton";
import Dialog from "./Dialog";
import Backdrop from "../Backdrop";
import XIcon from "../svgs/XIcon";
import OIcon from "../svgs/OIcon";

// Global Constants
const COMPUTER_THINKING_TIME = 500;

type BoardProps = {
   state: State;
   dispatch: React.Dispatch<Action>;
};

const Board = ({ state, dispatch }: BoardProps) => {
   // Hooks
   const [gameStatus, setGameStatus] = useState<GameStatus | undefined>(
      undefined
   );
   const [hoveredCell, setHoveredCell] = useState<{
      row: number;
      col: number;
   } | null>(null);

   // URL Params
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const gameParams: GameType = {
      player: (queryParams.get("player") as BoardSymbol) || "X",
      enemyPlayer: (queryParams.get("enemyPlayer") as BoardSymbol) || "O",
      enemyPlayerType:
         (queryParams.get("enemyPlayerType") as EnemyPlayerType) || "computer",
   };
   const { player, enemyPlayer, enemyPlayerType } = gameParams;

   // Destructuring
   const { board, currentPlayer, computerThinking } = state;

   function updateState(field: keyof State, value: State[keyof State]): void {
      dispatch({ type: "SET", field, value });
   }

   // Reset game
   function resetState(fullReset: boolean = false): void {
      dispatch({
         type: "SET",
         field: "board",
         value: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
         ],
      });
      dispatch({ type: "SET", field: "currentPlayer", value: "X" });
      setGameStatus(undefined);

      if (fullReset) {
         dispatch({
            type: "SET",
            field: "score",
            value: { x: 0, o: 0, ties: 0 },
         });
      }
   }

   // Go next round
   function goNextRound() {
      resetState();
      updateState("round", state.round + 1);

      if (gameStatus?.gameState === "won") {
         updateState("score", {
            ...state.score,
            [gameStatus?.winner === "X" ? "x" : "o"]:
               state.score[gameStatus?.winner === "X" ? "x" : "o"] + 1,
         });
      }

      if (gameStatus?.gameState === "draw") {
         updateState("score", {
            ...state.score,
            ["ties"]: state.score["ties"] + 1,
         });
      }
   }

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
         currentPlayer === player ? player : enemyPlayer;

      // Update state
      updateState("board", newBoard);
      updateState("currentPlayer", currentPlayer === "X" ? "O" : "X");
      const status = handleGameStates(
         newBoard,
         currentPlayer === player ? player : enemyPlayer
      );
      setGameStatus(status);
   }

   // Computer Move
   useEffect(() => {
      if (enemyPlayerType === "human") return;
      if (
         gameStatus?.gameState === "won" ||
         isFullBoard(board) ||
         currentPlayer === player
      )
         return;

      if (currentPlayer === enemyPlayer) {
         updateState("computerThinking", true);
         setTimeout(() => {
            // Get computer move
            const computerMoveBoard = getRandomComputerMove(board, enemyPlayer);

            // Update state
            updateState("board", computerMoveBoard);
            updateState("currentPlayer", player);
            const status = handleGameStates(computerMoveBoard, enemyPlayer);
            setGameStatus(status);
            updateState("computerThinking", false);
         }, COMPUTER_THINKING_TIME);
      }
   }, [currentPlayer]);

   // Set starting player
   useEffect(() => {
      setGameStatus(handleGameStates(board, player));
   }, []);

   useEffect(() => {
      console.log(state.score);
   }, [state]);

   return (
      <>
         {gameStatus?.gameState === "won" ||
         gameStatus?.gameState === "draw" ? (
            <Backdrop>
               <Dialog gameStatus={gameStatus} goNextRound={goNextRound} />
            </Backdrop>
         ) : null}
         <div className={styles.boardContainer}>
            <div className={styles.header}>
               <div className={styles.logo}>
                  <Link to="/">
                     <img src="/images/logo.svg" alt="Logo" />
                  </Link>
               </div>
               <div className={styles.turn}>
                  {currentPlayer === "X" ? <XIcon /> : <OIcon />}
                  <h4>Turn</h4>
               </div>
               <div className={styles.retry}>
                  <RetryButton onClick={resetState} />
               </div>
            </div>
            <div className={styles.board}>
               {board.map((row, rowIndex) =>
                  row.map((cell, cellIndex) => (
                     <div
                        key={cellIndex}
                        className={styles.cell}
                        onClick={() => handleClick(rowIndex, cellIndex)}
                        onMouseEnter={() =>
                           setHoveredCell({ row: rowIndex, col: cellIndex })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                     >
                        {cell === "" &&
                           hoveredCell?.row === rowIndex &&
                           hoveredCell?.col === cellIndex &&
                           !computerThinking &&
                           currentPlayer === "X" && (
                              <img
                                 src="/images/icon-x-outline.svg"
                                 alt="X Outline"
                              />
                           )}
                        {cell === "" &&
                           hoveredCell?.row === rowIndex &&
                           hoveredCell?.col === cellIndex &&
                           !computerThinking &&
                           currentPlayer === "O" && (
                              <img
                                 src="/images/icon-o-outline.svg"
                                 alt="O Outline"
                              />
                           )}
                        {cell === "X" && (
                           <img src="/images/icon-x.svg" alt="X" />
                        )}
                        {cell === "O" && (
                           <img src="/images/icon-o.svg" alt="O" />
                        )}
                     </div>
                  ))
               )}
            </div>
            <div className={styles.scoreBoard}>
               <div className={styles.xWin}>
                  <p>
                     X{" "}
                     {player === "X"
                        ? "(YOU)"
                        : enemyPlayerType === "human"
                        ? "(HUMAN)"
                        : "(CPU)"}
                  </p>
                  <h2>{state.score.x}</h2>
               </div>
               <div className={styles.ties}>
                  <p>Ties</p>
                  <h2>{state.score.ties}</h2>
               </div>
               <div className={styles.oWin}>
                  <p>
                     O{" "}
                     {player === "O"
                        ? "(YOU)"
                        : enemyPlayerType === "human"
                        ? "(HUMAN)"
                        : "(CPU)"}
                  </p>
                  <h2>{state.score.o}</h2>
               </div>
            </div>
         </div>
      </>
   );
};

export default Board;
