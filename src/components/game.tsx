import React, { useState, useEffect, useRef } from "react";

export default function Game(): JSX.Element {
    const boardWidth = 75;
    const boardHeight = 50;
    const [board, setBoard] = useState<boolean[][]>([]);

    useEffect(() => {
        const newBoard: boolean[][] = [];
        for (let i = 0; i < boardHeight; i++) {
            newBoard.push([]);
            for (let j = 0; j < boardWidth; j++) {
                newBoard[i].push(false);
            }
        }
        setBoard(newBoard);
    }, []);

    return (
        <div>
            {board.length > 0 ? 
                board.map((row, i) => (
                    <div key={i} className="flex">
                        {row.map((col, j) => (
                            <div key={j} className="w-2 h-2 border border-black" style={{backgroundColor: col ? "black" : "white"}}></div>
                        ))}
                    </div>
                ))
            : null}
        </div>
    );
}