import React from 'react';
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import Header from './Header';
import Links from './Links';
import './Navigation.css';
const Navigation = props => {
  return (
    <React.Fragment>
      <Header>
        <h1 className="navigationTitle">
          <Link to="/">HiveMind</Link>
        </h1>
        <nav className="navigationLinks">
          <Links/>
        </nav>
      </Header>
    </React.Fragment>
  );
};
export default Navigation;
