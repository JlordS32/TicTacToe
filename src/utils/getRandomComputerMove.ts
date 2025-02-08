import { BoardSymbol, BoardType } from "../types/GameType";

export const getRandomComputerMove = (board: BoardType, computerSymbol: BoardSymbol): BoardType => {        
    const newBoard: BoardType = [...board];
    let randomRow, randomColumn;

    do {
        randomRow = Math.floor(Math.random() * 3);
        randomColumn = Math.floor(Math.random() * 3);
    } while (newBoard[randomRow][randomColumn] !== "");

    newBoard[randomRow][randomColumn] = computerSymbol;
    return newBoard;
};

export const isFullBoard = (board: BoardType): boolean => {
   return board.every((row) => row.every((cell) => cell !== ""));
}