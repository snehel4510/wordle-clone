import React from 'react'

export default function Row({guess, currentGuess, inHistory}) {

    if(guess) {
        return (
            <div className='row past'>
                {
                    guess.map((l,i) => (
                        <div key={i} className={l.color}>{l.key}</div>
                    ))
                }
            </div>
        )
    }

    if(currentGuess) {

        if(inHistory) {
            return (
                <div className='row history'>
                    {
                        currentGuess.split('').map((l,i) => (
                            <div key={i} className='filled'>{l}</div>
                        ))
                    }
                 {/* return empty div to make the length of 5 all times */}
                    {[...Array(5 - currentGuess.length)].map((_,i) => (
                        <div key={i} className='empty'></div>
                    ))}
                </div>
            )
        }

        return (
            <div className='row current'>
                {
                    currentGuess.split('').map((l,i) => (
                        <div key={i} className='filled'>{l}</div>
                    ))
                }
             {/* return empty div to make the length of 5 all times */}
                {[...Array(5 - currentGuess.length)].map((_,i) => (
                    <div key={i} className='empty'></div>
                ))}
            </div>
        )
    }

  return (
    <div className='row'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
