import React from 'react';
import Image from '../images/Star-Wars-Símbolo.png';

let LogoStyle = {
  width: "100%",
  maxWidth: "1200px",
};

function Logo() {
  return (
    <img style={LogoStyle} src={Image} alt="Star-Wars"></img>
  );
}

export default Logo;