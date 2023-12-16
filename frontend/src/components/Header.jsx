import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarToggler, Collapse } from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="light" light expand="md">
      <h1>
        <NavLink to="/">Student Registration</NavLink>
      </h1>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem className="me-2">
            <NavLink to="/">Student Record</NavLink>
          </NavItem>
          <NavItem className="me-2">
            <NavLink to="/student">Student</NavLink>
          </NavItem>
          <NavItem className="me-2">
            <NavLink to="/teacher">Teacher</NavLink>
          </NavItem>
          <NavItem className="me-2">
            <NavLink to="/classroom">Classroom</NavLink>
          </NavItem>
          <NavItem className="me-2">
            <NavLink to="/subject">Subject</NavLink>
          </NavItem>
          <NavItem className="me-2">
            <NavLink to="/allocate-subject">Allocate Subject</NavLink>
          </NavItem>
          <NavItem className="me-2">
            <NavLink to="/allocate-classroom">Allocate Classroom</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
