import React from 'react'
import tango from '../pics/argentine-tango_primary.jpg'

const AboutPage = () => {

  const style = {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 23,
    color: 'white'
  }

  const textItems = [
    'Here you can save and comment your favourite ballrooms',
    'Look, save and comment danceschools',
    'Look, save and comment videolinks',
    'Make calendar notes',
    'Under links page you find some useful shortcut buttons'
  ]

  const containerStyle = {
    position: 'relative'
  }

  const mappedItems = textItems.map(item => <li key={item}>{item}</li>)

  return (
    <div style={containerStyle}>
      <img style={style} src={tango} alt='tango' width='900px' height='700px'/>
      <ul style={style} >
        {mappedItems}
      </ul>
    </div>
  )
}

export default AboutPage