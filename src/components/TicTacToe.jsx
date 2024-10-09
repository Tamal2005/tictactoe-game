import React, { useRef, useState } from 'react'
import '../index.css'
import cross_icon from '../Assets/cross.png'
import circle_icon from '../Assets/circle.png'


function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isNext, setIsNext] = useState(true);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  

  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ]

  const toggle = (index) => {
    if (board[index] || lock) return;

    const newBoard = [...board];
    const currentPlayer = isNext ? 'x': 'o';
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard)){
      won(currentPlayer);
      setLock(true);
    } else if (newBoard.every((box) => box !== "")){
      titleRef.current.innerHTML = "It's a Draw!";
      setLock(true);
    }
    else {
      setIsNext(!isNext);
    }
  };
  const checkWin = (board) => {
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    })
  }
  const won = (winner) => {
    titleRef.current.innerHTML = `The Winner Is &nbsp;&nbsp;:&nbsp;&nbsp; <img src=${winner === 'x' ? cross_icon: circle_icon} alt='winner icon'>`; 
  }

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setLock(false);
    setIsNext(true);
    titleRef.current.innerHTML = 'Tic Tac Toe Game';
  }
  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game</h1>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="box"
            onClick={() => toggle(index)}
          >
            {value === 'x' ? <img src={cross_icon} alt="X" /> : value === 'o' ? <img src={circle_icon} alt="O" /> : null}
          </div>
        ))}
      </div>
      <button className='reset' onClick={resetGame}>Reset</button>
    </div>

  )
}

export default TicTacToe
