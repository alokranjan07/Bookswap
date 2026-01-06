import React from 'react'

function Bookcard() {
  return (
    <div>
        <div>
        <h1 className="heading">Books Availabe For Swap</h1>
        </div>
        <div className="center">
            <p className="details"></p>
            <p className="price"></p>
        </div>
        <div className="button">
            <button className="swap"></button>
            <button className="like"></button>
            <button className="comment"></button>
        </div>
    </div>
    
  )
}

export default Bookcard