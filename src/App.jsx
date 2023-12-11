import { useState,useCallback ,useEffect} from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password,setPassword]= useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div><h1>Password Generator</h1></div> <br />
      <div className="form-floating">
        <input 
          type="text" 
          value={password}
          className="form-control" 
          // id="floatingPassword" 
          placeholder="Password"
          readOnly
        />
        <label htmlFor="floatingPassword">Password</label>
        <button type="button" class="btn btn-secondary" onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <br />

      <div className="controls">
        <input
          type="range"
          className="slider"
          min={0}
          max={100}
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>{length}</label>
        ||
        <input 
          type="checkbox" 
          id="numbers" 
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev);
        }}
        />
        <label htmlFor="numbers">Number</label>
        ||
        <input 
          type="checkbox" 
          id="characters" 
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev )
        }}
        />
        <label htmlFor="characters">Character</label>
      </div>
    </>
  )
}

export default App
