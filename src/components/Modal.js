import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
  return (
    <div className='modal'>
        {isCorrect && (
                <div><h1>You won 😄</h1><h3>You took <span className="hlt">{turn}</span> turns to guess it correctly</h3></div>
            )}
        {!isCorrect && (
                <div><h1>You ran out of Guesses 😔</h1><h3>The correct word was <span className="hlt">{solution}</span></h3></div>
            )}
    </div>
  )
}
