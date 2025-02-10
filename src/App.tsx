import styles from "./styles/modules/Main.module.scss";
import Game from "./components/game/Game";
import { Route, Routes, useLocation } from "react-router";
import NotFound from "./pages/NotFound";
import Board from "./components/game/Board";
import { State, Action } from "./types/ReducerType";
import { useEffect, useReducer } from "react";

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
      case "RESET":
         return JSON.parse(JSON.stringify(initialState));
      default:
         return state;
   }
};
const App = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const location = useLocation();

   const updateState = (
      field: keyof State,
      value: State[keyof State]
   ): void => {
      dispatch({ type: "SET", field, value });
   };

   // Reset state on page refresh
   useEffect(() => {
      const handleBeforeUnload = () => {
         dispatch({ type: "RESET" });
         alert("hey");
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, []);

   useEffect(() => {
      if (location.pathname === "/") {
         updateState("board", [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
         ]);
         updateState("currentPlayer", "X");
         updateState("round", 0);
         updateState("score", { x: 0, o: 0, ties: 0 });
      }
   }, [location.pathname]);

   useEffect(() => {
      console.log(state.board);
   }, [state.board]);

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
