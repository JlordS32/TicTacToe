import styles from "./styles/modules/Main.module.scss";
import Board from "./components/gameStates/Board";
import Menu from "./components/gameStates/Menu";

const App = () => {
   return (
      <main className={styles.main}>
         <Board />
      </main>
   );
};

export default App;
