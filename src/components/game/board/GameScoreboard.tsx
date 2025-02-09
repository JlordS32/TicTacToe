// Styles
import styles from "../../../styles/modules/Board.module.scss";

// Types
import { BoardSymbol, EnemyPlayerType } from "../../../types/GameType";
import { State } from "../../../types/ReducerType";

type GameScoreboardType = {
   state: State;
   player: BoardSymbol;
   enemyPlayerType: EnemyPlayerType;
};

const GameScoreboard = ({
   state,
   player,
   enemyPlayerType,
}: GameScoreboardType) => {
   return (
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
   );
};

export default GameScoreboard;