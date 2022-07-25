import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({solution}) {

    const {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, inHistory} = useWordle(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if(isCorrect) {
            // alert('You got it!')
            setTimeout(() => {
              setShowModal(true)
            }, 2500)
            window.removeEventListener('keyup', handleKeyup)
        }

        if(turn > 5) {
          // alert('You lost!')
          setTimeout(() => {
            setShowModal(true)
          }, 2500)
          window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

    // useEffect(() => {
        // console.log(turn)
        // console.log(guesses)
        // console.log(history)
        // console.log(isCorrect)
    //     console.log(usedKeys)
    // }, [turn, guesses, isCorrect, history, usedKeys])

  return (
    <div>
        {/* solution: {solution} <br/> */}
        {/* current guess - {currentGuess} */}
        <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} inHistory={inHistory} />
        <Keypad keys={usedKeys}/>
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  )
}
