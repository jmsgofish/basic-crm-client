import React, {PropTypes} from 'react';
import { Link, NavLink, IndexLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="card blue-grey darken-1">
      <NavLink to="/contact" activeClassName="active">Contacts</NavLink>
      {" | "}
      <NavLink to="/case" activeClassName="active">Cases</NavLink>
    </nav>
  );
};

export default Header;
