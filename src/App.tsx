import styles from "./styles/modules/Main.module.scss";
import Game from "./components/game/Game";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import Board from "./components/game/Board";
import { State, Action } from "./types/ReducerType";
import { useReducer } from "react";

const initialState: State = {
   board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
   ],
   currentPlayer: "X",
   computerThinking: false,
   round: 0,
   score: {
      x: 0,
      o: 0,
      ties: 0,
   },
};

const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case "SET":
         return { ...state, [action.field]: action.value };
      default:
         return state;
   }
};

const App = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <main className={styles.main}>
         <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/*" element={<NotFound />} />
            <Route
               path="/board"
               element={<Board state={state} dispatch={dispatch} />}
            />
         </Routes>
      </main>
   );
};

export default App;
