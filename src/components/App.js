import React from 'react';
import Background from '../images/sky-space-milky-way-stars-110854.jpg';
import Logo from './Logo';
import CharacterList from './CharacterList';

let BgStyle = {
  width: "100%",
  minHeight: "100vh",
  position: "absolute",
  top: "0",
  background: `url(${Background})`,
  margin: "0"
};

let ContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "1200px",
  margin: "0 auto",
  color: "white"
};

function App() {
  return (
    <div className="App" style={BgStyle}>
      <div style={ContainerStyle}>
        <Logo></Logo>
        <CharacterList></CharacterList>
      </div>
    </div>
  );
}

export default App;
