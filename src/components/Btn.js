import React from 'react'

function Btn(props) {
  return (
    <button onClick={props.onClick}>{!props.tenzies ? "Roll" : "New Game"}</button>
  )
}

export default Btn
