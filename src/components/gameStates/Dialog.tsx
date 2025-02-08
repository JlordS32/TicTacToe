import { useEffect } from "react";
import styles from "../../styles/modules/Dialog.module.scss";
import { useBackdropData } from "../Backdrop";
import Button from "../Button";

const Dialog = () => {
   const data = useBackdropData();

   return (
      <div className={styles.dialog}>
         <div>
            <h4 className={styles.message}>Oh no, you lost...</h4>
            <div className={styles.winner}>
               <img src="/images/icon-o.svg" alt="lose" />
               <h1 style={{ color: "var(--yellow)" }}>Takes the round</h1>
            </div>
            <div className={styles.buttons}>
               <Button text="Quit" type="secondary" version="two" />
               <Button text="Next round" type="secondary" />
            </div>
         </div>
      </div>
   );
};

export default Dialog;
