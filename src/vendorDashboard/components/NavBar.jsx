import React from 'react'

const NavBar = ({showLoginHandler, showRegisterHandler}) => {

  return (
    <div class="navSection">
        <div className="Company">
            Vendor Dashboard
        </div>
        <div className="userAuth">
            <span onClick={showLoginHandler}>Login / </span>
            <span onClick={showRegisterHandler}>Register</span>
        </div>
    </div>
  )
}

export default NavBar