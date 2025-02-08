import { createContext, useContext } from "react";
import styles from "../styles/modules/Backdrop.module.scss";
import { GameStatus } from "../types/GameType";

type BackdropType = {
   children?: React.ReactNode;
   data?: any;
};

const BackdropContext = createContext<GameStatus | undefined>(undefined);

const Backdrop = ({ children, data }: BackdropType) => {
   return (
      <BackdropContext.Provider value={data as GameStatus | undefined}>
         <div className={styles.backdrop}>{children}</div>
      </BackdropContext.Provider>
   );
};

export const useBackdropData = () => {
   const context = useContext(BackdropContext);
   if (!context) {
      throw new Error("useBackdropData must be used within a BackdropProvider");
   }
   return context;
};

export default Backdrop;
