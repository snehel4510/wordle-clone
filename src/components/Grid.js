import React from 'react'
import Row from './Row'

export default function Grid({turn, currentGuess, guesses, inHistory}) {
  return (
    <div>
        {guesses.map((g,i) => {
            if(i === turn) {
                return <Row key={i} currentGuess={currentGuess} inHistory={inHistory} />
            }
            return <Row key={i} guess={g} />
        })}
    </div>
  )
}
