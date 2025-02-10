// Styles
import styles from "../../styles/modules/Board.module.scss";

// Hooks
import { useEffect, useRef, useState } from "react";
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
import AudioManager from "../../utils/audio";

// Global Constants
const COMPUTER_THINKING_TIME = 500;

type BoardProps = {
   state: State;
   dispatch: React.Dispatch<Action>;
};

// TODO: Finish media queries for mobile
const Board = ({ state, dispatch }: BoardProps) => {
   // Ref to track initial render
   const isFirstRender = useRef(true);

   // Hooks
   const [gameStatus, setGameStatus] = useState<GameStatus | undefined>(
      undefined
   );
   const [restart, setRestart] = useState<boolean>(false);
   const [hoveredCell, setHoveredCell] = useState<{
      row: number;
      col: number;
   } | null>(null);

   // Audio
   const clip = new Audio("/audio/click_sfx.mp3");
   const audioManager = AudioManager.getInstance();

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

   const updateState = (
      field: keyof State,
      value: State[keyof State]
   ): void => {
      dispatch({ type: "SET", field, value });
   };

   // Reset game
   const resetState = (): void => {
      updateState("board", [
         ["", "", ""],
         ["", "", ""],
         ["", "", ""],
      ]);
      updateState("currentPlayer", player);
      updateState("round", 0);
      updateState("score", { x: 0, o: 0, ties: 0 });
      setGameStatus(undefined);
   };

   // Go next round
   const goNextRound = (): void => {
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
   };

   // Player Move
   const handleClick = (rowIndex: number, cellIndex: number): void => {
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
   };
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

   const startMusic = () => {
      audioManager.playMusic();
   };

   // Set starting player
   useEffect(() => {
      setGameStatus(handleGameStates(board, player));
   }, []);

   // Listen to game
   useEffect(() => {
      if (isFirstRender.current) {
         // Skip sound on initial render
         isFirstRender.current = false;
         return;
      }
      clip.play();
   }, [state.board]);

   useEffect(() => {
      audioManager.playMusic();
   }, []);

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
                     setRestart(false);
                     resetState();
                  }}
               />
            </Backdrop>
         )}
         <div
            className={styles.boardContainer}
            onClick={() => {
               if (!audioManager.isPlaying) {
                  startMusic();
               }
            }}
         >
            <GameHeader
               currentPlayer={currentPlayer}
               restartGame={() => {
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
