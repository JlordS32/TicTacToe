// Styles
import styles from "../../styles/modules/Board.module.scss";

// Hooks
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

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
import Dialog from "./Dialog";
import Backdrop from "../Backdrop";
import GameHeader from "./board/GameHeader";
import GameBoard from "./board/GameBoard";
import GameScoreboard from "./board/GameScoreboard";
import RestartDialog from "../RestartDialog";

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
   const [restart, setRestart] = useState<boolean>(false);
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
         {restart && (
            <Backdrop>
               <RestartDialog
                  cancel={() => {
                     setRestart(false);
                  }}
                  resetState={() => {
                     resetState(true);
                     setRestart(false);
                  }}
               />
            </Backdrop>
         )}
         <div className={styles.boardContainer}>
            <GameHeader
               currentPlayer={currentPlayer}
               resetState={() => {
                  setRestart(true);
               }}
            />
            <GameBoard
               board={board}
               handleClick={handleClick}
               hoveredCell={hoveredCell}
               setHoveredCell={setHoveredCell}
               computerThinking={computerThinking}
               currentPlayer={currentPlayer}
            />
            <GameScoreboard
               state={state}
               player={player}
               enemyPlayerType={enemyPlayerType}
            />
         </div>
      </>
   );
};

export default Board;
