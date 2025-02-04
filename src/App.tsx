import styles from "./styles/modules/Main.module.scss";
import Board from "./components/gameStates/Board";

const App = () => {
   return (
      <main className={styles.main}>
         <Board />
      </main>
   );
};

export default App;
