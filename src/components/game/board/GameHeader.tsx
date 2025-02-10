// Styles
import styles from "../../../styles/modules/Board.module.scss";

// Hooks
import { Link } from "react-router";

// Types
import { BoardSymbol } from "../../../types/GameType";

// Components
import OIcon from "../../svgs/OIcon";
import XIcon from "../../svgs/XIcon";
import RetryButton from "../../RetryButton";

type GameHeaderType = {
   currentPlayer: BoardSymbol;
   restartGame: () => void;
};

const GameHeader = ({
   currentPlayer,
   restartGame,
}: GameHeaderType) => {
   return (
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
            <RetryButton onClick={restartGame} />
         </div>
      </div>
   );
};

export default GameHeader;
