import styles from "../../styles/modules/Menu.module.scss";

const Menu = () => {
   return (
      <div className={styles.container}>
         <div className={styles.logo}>
            <img src="/images/logo.svg" alt="Logo" />
         </div>
         <div className={styles.playerSelector}>
            <div>
               <h3>Pick the player 1's mark</h3>

               <div>
                  <div>
                     <img src="x-icon.svg" alt="X Icon" />
                  </div>
                  <div></div>
               </div>

               <p>Remember : X goes first</p>
            </div>
         </div>
         <div className={styles.modeSelector}>
            <div></div>
            <div></div>
         </div>
         .game
      </div>
   );
};

export default Menu;
