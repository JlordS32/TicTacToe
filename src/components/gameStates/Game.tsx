import { createContext, useState } from "react";
import { BoardSymbol, EnemyPlayerType } from "../../types/GameType";
import Board from "./Board";
import Backdrop from "../Backdrop";
import Menu from "./Menu";

const Game = () => {
   const [playerMark, setPlayerMark] = useState<BoardSymbol>("X");
   const [enemyPlayerType, setEnemyPlayerType] = useState<EnemyPlayerType>();
   const [gameStarted, setGameStarted] = useState<boolean>(false);

   // Context
   const gameStatus = createContext({});

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
            <Backdrop>
               <div>Hello</div>
            </Backdrop>
            <Board player={playerMark} enemyPlayerType={enemyPlayerType} />
         </>
      );
   }

   return (
      <>
         <Menu
            playerMark={playerMark}
            handleMarkSelection={handleMarkSelection}
            handleStartGame={handleStartGame}
         />
      </>
   );
};

export default Game;