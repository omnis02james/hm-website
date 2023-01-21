import React from 'react';
import './Header.css';
const Header = props => {
  return <header className="headerclass">{props.children}</header>;
};
export default Header;

