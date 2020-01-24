import React from 'react'
import Tango from '../pics/tango-dancing2.png'


const AboutPage = () => {
  return (
    <div>
      <em>Welcome to:</em> <h1><em>Dance Calendar app</em></h1>
      <ul>
        <li>Here you can save & comment your favourite ballrooms</li><br />
        <li>Look and & danceschools</li><br />
        <li>Look and & videolinks</li><br />
        <li>Look & mark calendar</li>
        <br></br>
        <img src={Tango} alt="Tango Dancing" />
      </ul>
    </div>
  )
}

export default AboutPage