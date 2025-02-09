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
   resetState: () => void;
};

const GameHeader = ({ currentPlayer, resetState }: GameHeaderType) => {
   return (
      <div className={styles.header}>
         <div className={styles.logo}>
            <Link to="/" onClick={() => resetState()}>
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
   );
};

export default GameHeader;
