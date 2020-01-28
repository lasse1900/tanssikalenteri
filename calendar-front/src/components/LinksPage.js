import React from 'react'

const LinksPage = () => {
  return (
    <div>
      <h1><em>Dance Calendar</em></h1>
      <p><em>Here are some links to help you contact your frieds and search the web!</em></p>
      <hr></hr>
      <div className="ui circular google icon mini button">
        <i className="google icon"></i>
        <a id="link" href="http://www.google.com" target="_blank" rel="noopener noreferrer">Connect</a>
      </div>
      <div className="ui circular youtube icon mini button">
        <i className="youtube icon"></i>
        <a id="link" href="http://www.youtube.com" target="_blank" rel="noopener noreferrer">Connect</a>
      </div>
      <div className="ui circular facebook icon mini button">
        <i className="facebook icon"></i>
        <a id="link" href="http://www.facebook.com" target="_blank" rel="noopener noreferrer">Connect</a>
      </div>
      <div className="ui circular twitter icon mini button">
        <i className="twitter icon"></i>
        <a id="link" href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">Connect</a>
      </div>
      <div className="ui circular linkedin icon mini button">
        <i className="linkedin icon"></i>
        <a id="link" href="http://www.linkedin.com" target="_blank" rel="noopener noreferrer">Connect</a>
      </div>
      <div className="ui circular gmail icon mini button">
        <i className="envelope outline icon"></i>
        <a id="link" href="http://www.gmail.com" target="_blank" rel="noopener noreferrer">Connect</a>
      </div>
      <div>
        <button className="ui circular whatsapp icon green mini button">
          <i className="whatsapp icon"></i>
          <a id="link" href="http://www.whatsapp.com" target="_blank" rel="noopener noreferrer">Connect</a>
        </button>
      </div>
    </div>
  );
}

export default LinksPage