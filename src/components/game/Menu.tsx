import styles from "../../styles/modules/Menu.module.scss";
import Button from "../Button";
import { BoardSymbol, EnemyPlayerType } from "../../types/GameType";
import XIcon from "../svgs/XIcon";
import OIcon from "../svgs/OIcon";

type MenuType = {
   playerMark: string;
   handleMarkSelection: (mark: BoardSymbol) => void;
   handleStartGame: (enemyPlayerType: EnemyPlayerType) => void;
};

const Menu = ({
   playerMark,
   handleMarkSelection,
   handleStartGame,
}: MenuType) => {
   return (
      <div className={styles.container}>
         <div className={styles.logo}>
            <img src="/images/logo.svg" alt="Logo" />
         </div>
         <div className={styles.playerSelector}>
            <h3>Pick the player's mark</h3>
            <div className={styles.markSelector}>
               <div
                  className={`${styles.XPlayer} ${
                     playerMark === "X" ? styles.active : ""
                  }`}
                  onClick={() => handleMarkSelection("X")}
               >
                  <XIcon />
               </div>
               <div
                  className={`${styles.OPlayer} ${
                     playerMark === "O" ? styles.active : ""
                  }`}
                  onClick={() => handleMarkSelection("O")}
               >
                  <OIcon />
               </div>
            </div>
            <p>Remember : X goes first</p>
         </div>
         <div className={styles.modeSelector}>
            <Button
               type="primary"
               version="one"
               text="New Game (VS CPU)"
               onClick={() => handleStartGame("computer")}
            />
            <Button
               type="primary"
               version="two"
               text="New Game (VS Player)"
               onClick={() => {
                  handleStartGame("human");
               }}
            />
         </div>
      </div>
   );
};

export default Menu;
