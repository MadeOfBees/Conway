import React, { useState, useEffect, useRef } from "react";

export default function Game(): JSX.Element {
  const boardWidth = 350;
  const boardHeight = 200;
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
    }, 4);
  };

  function gameOfLife(board: boolean[][]): boolean[][] {
    const newBoard = new Array<boolean[]>(boardHeight);
    for (let i = 0; i < boardHeight; i++) {
      newBoard[i] = new Array<boolean>(boardWidth).fill(false);
    }
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        let liveNeighborCount = 0;
        if (i > 0) {
          liveNeighborCount += board[i - 1][j] ? 1 : 0;
          if (j > 0) {
            liveNeighborCount += board[i - 1][j - 1] ? 1 : 0;
          }
          if (j < boardWidth - 1) {
            liveNeighborCount += board[i - 1][j + 1] ? 1 : 0;
          }
        }
        if (i < boardHeight - 1) {
          liveNeighborCount += board[i + 1][j] ? 1 : 0;
          if (j > 0) {
            liveNeighborCount += board[i + 1][j - 1] ? 1 : 0;
          }
          if (j < boardWidth - 1) {
            liveNeighborCount += board[i + 1][j + 1] ? 1 : 0;
          }
        }
        if (j > 0) {
          liveNeighborCount += board[i][j - 1] ? 1 : 0;
        }
        if (j < boardWidth - 1) {
          liveNeighborCount += board[i][j + 1] ? 1 : 0;
        }
        if (board[i][j]) {
          newBoard[i][j] = liveNeighborCount === 2 || liveNeighborCount === 3;
        } else {
          newBoard[i][j] = liveNeighborCount === 3;
        }
      }
    }
    return newBoard;
  }
  
  

  return (
    <div>
      {board.length > 0
        ? board.map((row, i) => (
            <div key={i} className="flex">
              {row.map((col, j) => (
                <div
                  key={j}
                  className="w-1 h-1"
                  style={{ backgroundColor: col ? liveCellColor : backgroundColor }}
                ></div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
}
