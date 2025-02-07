import styles from "./styles/modules/Main.module.scss";
import Game from "./components/gameStates/Game";

const App = () => {
   return (
      <main className={styles.main}>
         <Game />
      </main>
   );
};

export default App;
