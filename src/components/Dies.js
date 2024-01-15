import React from 'react'

function Dies(props) {
  return (
    <div className={`die ${props.isHeld ? "activeDie" : ""}`} onClick={props.clickOnDie}>
      <h1>{props.value}</h1>
    </div>
  )
}

export default Dies
