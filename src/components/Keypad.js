export default function Keypad({keys}) {

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    
  return (
    <div className='keypad'>
        {
            letters && letters.map((letter, index) => {
                if(keys.hasOwnProperty(letter.toLowerCase())) {
                    return <div key={index} className={keys[letter.toLowerCase()]}>{letter}</div>
                }
                return <div key={index}>{letter}</div>
            })
        }
    </div>
  )
}
