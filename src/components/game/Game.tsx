import { useState } from "react";
import { BoardSymbol, EnemyPlayerType } from "../../types/GameType";
import Menu from "./Menu";
import { useNavigate } from "react-router";

export type GameType = {
   player: BoardSymbol;
   enemyPlayer: BoardSymbol;
   enemyPlayerType: EnemyPlayerType;
}

const Game = () => {
   const [playerMark, setPlayerMark] = useState<BoardSymbol>("X");

   // Navigate
   const navigate = useNavigate();

   const handleMarkSelection = (mark: BoardSymbol): void => {
      setPlayerMark(mark);
   };

   const handleStartGame = (enemyPlayerType: EnemyPlayerType): void => {
      navigate(
         `board?player=${playerMark}&enemyPlayer=${
            playerMark === "X" ? "O" : "X"
         }&enemyPlayerType=${enemyPlayerType}`
      );
   };

   return (
      <Menu
         playerMark={playerMark}
         handleMarkSelection={handleMarkSelection}
         handleStartGame={handleStartGame}
      />
   );
};

export default Game;
