import styles from "../styles/modules/Dialog.module.scss";
import Button from "./Button";

type RestartDialog = {
   resetState: () => void;
   cancel: () => void;
};

const RestartDialog = ({ resetState, cancel }: RestartDialog) => {
   return (
      <div className={styles.dialog}>
         <h1>Restart Game?</h1>
         <div className={styles.buttons}>
            <Button
               type="secondary"
               version="two"
               text="No,  Cancel"
               onClick={cancel}
            />
            <Button
               type="secondary"
               version="one"
               text="Yes, Restart"
               onClick={resetState}
            />
         </div>
      </div>
   );
};

export default RestartDialog;
