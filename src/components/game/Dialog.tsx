import styles from "../../styles/modules/Dialog.module.scss";
import Button from "../Button";
import { BoardSymbol, GameStatus } from "../../types/GameType";
import { useNavigate } from "react-router";

type DialogType = {
   gameStatus: GameStatus | undefined;
   goNextRound: () => void;
   player: BoardSymbol;
};

const Dialog = ({ player, gameStatus, goNextRound }: DialogType) => {
   const navigate = useNavigate();

   return (
      <div className={styles.dialog}>
         <div>
            {gameStatus?.gameState === "won" && (
               <h4 className={styles.message}>
                  {gameStatus?.winner === player
                     ? "You won!"
                     : "Oh no, you lost..."}
               </h4>
            )}
            <div className={styles.winner}>
               {gameStatus?.gameState === "won" && (
                  <>
                     <img
                        src={`/images/icon-${
                           gameStatus?.winner === "X" ? "x" : "o"
                        }.svg`}
                        alt="lose"
                     />
                     <h1
                        style={{
                           color: `${
                              gameStatus?.winner === "X"
                                 ? "var(--blue-green)"
                                 : "var(--yellow)"
                           }`,
                        }}
                     >
                        Takes the round
                     </h1>
                  </>
               )}
               {gameStatus?.gameState === "draw" && <h1>Round Tied</h1>}
            </div>
            <div className={styles.buttons}>
               <Button
                  text="Quit"
                  type="secondary"
                  version="two"
                  onClick={() => {
                     navigate("/");
                  }}
               />
               <Button
                  text="Next round"
                  type="secondary"
                  onClick={goNextRound}
               />
            </div>
         </div>
      </div>
   );
};

export default Dialog;
