import { createContext, useContext, useEffect, useState } from "react";
import { BoardSymbol, EnemyPlayerType, GameStatus } from "../../types/GameType";
import Board from "./Board";
import Backdrop from "../Backdrop";
import Menu from "./Menu";
import Dialog from "./Dialog";

type GameContextType = {
   gameStatus: GameStatus | undefined;
   setGameStatus: React.Dispatch<React.SetStateAction<GameStatus | undefined>>;
   player: BoardSymbol;
   enemyPlayerType: EnemyPlayerType;
};

const GameContext = createContext<GameContextType>({
   gameStatus: undefined,
   setGameStatus: () => {},
   player: "X",
   enemyPlayerType: "human",
});

const Game = () => {
   const [playerMark, setPlayerMark] = useState<BoardSymbol>("X");
   const [enemyPlayerType, setEnemyPlayerType] =
      useState<EnemyPlayerType>("human");
   const [gameStarted, setGameStarted] = useState<boolean>(false);
   const [gameStatus, setGameStatus] = useState<GameStatus | undefined>(
      undefined
   );

   const handleMarkSelection = (mark: BoardSymbol): void => {
      setPlayerMark(mark);
   };

   const handleStartGame = (enemyPlayerType: EnemyPlayerType): void => {
      setEnemyPlayerType(enemyPlayerType);
      setGameStarted(true);
   };

   if (gameStarted) {
      return (
         <>
            {gameStatus?.gameState === "won" ||
            gameStatus?.gameState === "draw" ? (
               <GameContext.Provider
                  value={{
                     gameStatus,
                     setGameStatus,
                     player: playerMark,
                     enemyPlayerType,
                  }}
               >
                  <Backdrop>
                     <Dialog />
                  </Backdrop>
               </GameContext.Provider>
            ) : null}
            <GameContext.Provider
               value={{
                  gameStatus,
                  setGameStatus,
                  player: playerMark,
                  enemyPlayerType,
               }}
            >
               <Board />
            </GameContext.Provider>
         </>
      );
   }

   return (
      <Menu
         playerMark={playerMark}
         handleMarkSelection={handleMarkSelection}
         handleStartGame={handleStartGame}
      />
   );
};

export const useGame = () => {
   const context = useContext(GameContext);
   if (!context) {
      throw new Error("useGame must be used within a GameProvider");
   }
   return context;
};

export default Game;
