import React, { useState, useEffect, useRef } from "react";

export default function Game(): JSX.Element {
  const boardWidth = 175;
  const boardHeight = 100;
  const backgroundColor = "#999999"
  const liveCellColor = "#333333"
  const [board, setBoard] = useState<boolean[][]>([]);

  useEffect(() => {
    const newBoard: boolean[][] = [];
    for (let i = 0; i < boardHeight; i++) {
      newBoard.push([]);
      for (let j = 0; j < boardWidth; j++) {
        newBoard[i].push(false);
      }
    }
    const liveBoard = placeRandomLiveCells(newBoard);
    gameLoop(liveBoard);
    return;
  }, []);

  const placeRandomLiveCells = (board: boolean[][]): boolean[][] => {
    const liveCells = Math.floor(board.length * board[0].length * 0.11);
    const numRows = board.length;
    const numCols = board[0].length;
    for (let i = 0; i < liveCells; i++) {
      const row = Math.floor(Math.random() * numRows);
      const col = Math.floor(Math.random() * numCols);
      board[row][col] = true;
    }
    return board;
  };

  const gameLoop = async (board: boolean[][]) => {
    setTimeout(async () => {
      const newBoard: boolean[][] = await gameOfLife(board);
      setBoard(newBoard);
      await gameLoop(newBoard);
    }, 10);
  };

  const gameOfLife = (board: boolean[][]): boolean[][] => {
    const newBoard: boolean[][] = [];
    for (let i = 0; i < boardHeight; i++) {
      newBoard.push([]);
      for (let j = 0; j < boardWidth; j++) {
        let numLiveNeighbors = 0;
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            if (k === 0 && l === 0) continue;
            const neighborRow = i + k;
            const neighborCol = j + l;
            if (neighborRow >= 0 && neighborRow < boardHeight && neighborCol >= 0 && neighborCol < boardWidth && board[neighborRow][neighborCol]) {
              numLiveNeighbors++;
            }
          }
        }
        if (board[i][j]) {
          newBoard[i][j] = numLiveNeighbors === 2 || numLiveNeighbors === 3;
        } else {
          newBoard[i][j] = numLiveNeighbors === 3;
        }
      }
    }
    return newBoard;
  };

  return (
    <div>
      {board.length > 0
        ? board.map((row, i) => (
            <div key={i} className="flex">
              {row.map((col, j) => (
                <div
                  key={j}
                  className="w-2 h-2"
                  style={{ backgroundColor: col ? liveCellColor : backgroundColor }}
                ></div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
}
