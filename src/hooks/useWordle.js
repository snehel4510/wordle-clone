import { useState } from 'react'

const useWordle = (solution) => {

  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array of formatted guesses
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})  // {a: 'yellow', b: 'grey', c: 'green', ...}
  const [inHistory, setInHistory] = useState(false)

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  // yellow : letter is in the word but at wrong position
  // green : letter is in the word at the correct position
  // grey : letter is not in the word
  const formatGuess = () => {

    // console.log('formatting the guess - ', currentGuess)

    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((l) => {
      return {key: l, color: 'grey'}
    })

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })
    
    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {

    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses((prev) => {
      const newGuesses = [...prev]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory((prev) => {
      return [...prev, currentGuess]
    })
    
    setTurn(prev => prev + 1)

    setUsedKeys(prevUsedKeys => {
      formattedGuess.forEach(l => {
        const currentColor = prevUsedKeys[l.key]

        if (l.color === 'green') {
          prevUsedKeys[l.key] = 'green'
          return
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[l.key] = 'yellow'
          return
        }
        if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          prevUsedKeys[l.key] = 'grey'
          return
        }
      })

      return prevUsedKeys
    })

    setCurrentGuess('')

  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({key}) => {
    // console.log(key)
    if (key === 'Enter') {
      // only add guess if the turn < 5 and the guess is 5 letters long and not already in the history
      if(history.includes(currentGuess)){
          setInHistory(true)
      }

      if (turn <= 5 && currentGuess.length === 5 && !history.includes(currentGuess)) {

        const formattedGuess = formatGuess()
        addNewGuess(formattedGuess)
        setInHistory(false)
        // console.log(formattedGuess)
        
      }
    }
    else if(key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1))
      setInHistory(false)
    }
    // check if the key is a letter
    else if(/^[A-Za-z]$/.test(key)) {
      // add the letter to the current guess
      if(currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key
        })
      }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, history, handleKeyup, usedKeys, inHistory}
}

export default useWordle