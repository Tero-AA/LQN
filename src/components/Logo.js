import React from 'react';
import Image from '../images/Star-Wars-Símbolo.png';

let LogoStyle = {
  width: "50%",
  maxWidth: "1200px",
  margin: "50px auto"
};

function Logo() {
  return (
    <img style={LogoStyle} src={Image} alt="Star-Wars"></img>
  );
}

export default Logo;