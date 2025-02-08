import styles from "./styles/modules/Main.module.scss";
import Game from "./components/gameStates/Game";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";

const App = () => {
   return (
      <main className={styles.main}>
         <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/*" element={<NotFound />} />
         </Routes>
      </main>
   );
};

export default App;
