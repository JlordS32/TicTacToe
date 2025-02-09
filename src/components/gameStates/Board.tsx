import { useEffect, useReducer, useState } from "react";
import {
   BoardType,
   BoardSymbol,
   GameStatus,
   EnemyPlayerType,
} from "../../types/GameType";
import styles from "../../styles/modules/Board.module.scss";
import {
   getRandomComputerMove,
   isFullBoard,
} from "../../utils/getRandomComputerMove";
import { handleGameStates } from "../../utils/handleGameStates";
import RetryButton from "../RetryButton";
import Dialog from "./Dialog";
import Backdrop from "../Backdrop";
import { useLocation } from "react-router";
import { GameType } from "./Game";
import XIcon from "../svgs/XIcon";
import OIcon from "../svgs/OIcon";

const COMPUTER_THINKING_TIME = 500;

type State = {
   board: BoardType;
   currentPlayer: BoardSymbol;
   computerThinking: boolean;
   score: {
      x: number;
      o: number;
      ties: number;
   };
};

type Action =
   | { type: "SET"; field: keyof State; value: State[keyof State] }
   | { type: "RESET" };

const initialState: State = {
   board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
   ],
   currentPlayer: "X",
   computerThinking: false,
   score: {
      x: 0,
      o: 0,
      ties: 0,
   },
};

const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case "SET":
         return { ...state, [action.field]: action.value };
      case "RESET":
         return initialState;
      default:
         return state;
   }
};

const Board = () => {
   // Hooks
   const [gameStatus, setGameStatus] = useState<GameStatus | undefined>(
      undefined
   );
   const [state, dispatch] = useReducer(reducer, initialState);
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

   function resetState() {
      dispatch({ type: "RESET" });
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

   return (
      <>
         {gameStatus?.gameState === "won" ||
         gameStatus?.gameState === "draw" ? (
            <Backdrop>
               <Dialog gameStatus={gameStatus} />
            </Backdrop>
         ) : null}
         <div className={styles.boardContainer}>
            <div className={styles.header}>
               <div className={styles.logo}>
                  <img src="/images/logo.svg" alt="Logo" />
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
