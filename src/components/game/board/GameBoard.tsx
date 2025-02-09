import styles from "../../../styles/modules/Board.module.scss";

// Types
import { BoardSymbol, BoardType } from "../../../types/GameType";

type GameBoardType = {
   board: BoardType;
   handleClick: (rowIndex: number, cellIndex: number) => void;
   setHoveredCell: (cell: { row: number; col: number } | null) => void;
   computerThinking: boolean;
   currentPlayer: BoardSymbol;
   hoveredCell: { row: number; col: number } | null;
};

const GameBoard = ({
   board,
   handleClick,
   setHoveredCell,
   computerThinking,
   currentPlayer,
   hoveredCell,
}: GameBoardType) => {
   return (
      <div className={styles.board}>
         {board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
               <div
                  key={cellIndex}
                  className={styles.cell}
                  onClick={() => handleClick(rowIndex, cellIndex)}
                  onMouseEnter={() =>
                     setHoveredCell({ row: rowIndex, col: cellIndex })
                  }
                  onMouseLeave={() => setHoveredCell(null)}
               >
                  {cell === "" &&
                     hoveredCell?.row === rowIndex &&
                     hoveredCell?.col === cellIndex &&
                     !computerThinking &&
                     currentPlayer === "X" && (
                        <img src="/images/icon-x-outline.svg" alt="X Outline" />
                     )}
                  {cell === "" &&
                     hoveredCell?.row === rowIndex &&
                     hoveredCell?.col === cellIndex &&
                     !computerThinking &&
                     currentPlayer === "O" && (
                        <img src="/images/icon-o-outline.svg" alt="O Outline" />
                     )}
                  {cell === "X" && <img src="/images/icon-x.svg" alt="X" />}
                  {cell === "O" && <img src="/images/icon-o.svg" alt="O" />}
               </div>
            ))
         )}
      </div>
   );
};

export default GameBoard;
