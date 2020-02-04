import React from 'react'
import { Icon, Button } from 'semantic-ui-react'

const LinksPage = () => {
  return (
    <div>
      <h1><em>Dance Calendar</em></h1>
      <p><em>Here are some links to help you contact your frieds and search the web!</em></p>
      <hr></hr>

      <div className="ui circular google icon mini button">
        <a id="link" href="http://www.google.com" target="_blank" rel="noopener noreferrer">
          <Icon className="google icon"></Icon>
        </a>
      </div>
      <div className="ui circular youtube icon mini button">
        <a id="link" href="http://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <Icon className="youtube icon"></Icon>
        </a>
      </div>
      <div className="ui circular facebook icon mini button">
        <a id="link" href="http://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Icon className="facebook icon"></Icon>
        </a>
      </div>
      <div className="ui circular twitter icon mini button">
        <a id="link" href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <Icon className="twitter icon"></Icon>
        </a>
      </div>
      <div className="ui circular gmail icon mini button">
        <a id="link" href="http://www.gmail.com" target="_blank" rel="noopener noreferrer">
          <Icon className="envelope outline icon"></Icon>
        </a>
      </div>
      <div className="ui circular whatsapp icon green mini button">
        <a id="link" href="http://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
          <Icon className="whatsapp icon"></Icon>
        </a>
      </div>
      <div className="ui circular linkedin icon mini button">
        <Icon className="linkedin icon"></Icon>
        <a id="link" href="http://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <Icon className="linkedin icon"></Icon>
        </a>
      </div>
      <br></br><br></br>
      <hr></hr>
      <p><em>Following links to finnish websites</em></p>

      <Button className="ui primary basic button">
        <a id="link" href="http://www.tanssi.net" target="_blank" rel="noopener noreferrer">Suomen tanssipalvelin</a>
      </Button>
      <Button className="ui primary basic button">
        <a id="link" href="http://tanssi.net/fi/tausta/sanasto.html" target="_blank" rel="noopener noreferrer">tanssisanasto</a>
      </Button>
      <Button className="ui primary basic button">
        <a id="link" href="http://viiri.net/tanssmus/" target="_blank" rel="noopener noreferrer">musiikkitietosivusto</a>
      </Button>
    </div>
  );
}

export default LinksPage

// <Button data-cy="to-registerForm" className="ui basic tiny button" type='submit' onClick={goToRegisterPage} >to Register Page</Button>