import styles from "./styles/modules/Main.module.scss";
import Game from "./components/gameStates/Game";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import Board from "./components/gameStates/Board";

const App = () => {
   return (
      <main className={styles.main}>
         <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/board" element={<Board />} />
         </Routes>
      </main>
   );
};

export default App;
