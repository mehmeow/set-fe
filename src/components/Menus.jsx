import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Cart from './Cart';
import { useSelector } from "react-redux";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  meniItem: {
    "& a": { color: "#fff", textDecoration: "none" },
    padding: "0 15px"
  }
});

export default function Menus() {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const { count } = useSelector(state => state.MANAGE_CART);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();

  return location.pathname !== '/' &&
    (<div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SETEL DEMO</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item className={classes.meniItem}><Link to={`/products`}>Products</Link></Nav.Item>
              <Nav.Item className={classes.meniItem}><Link to={`/history`}>History</Link></Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item><Button onClick={handleShow}>Carts ({count})</Button></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart {...{ show, handleClose }} />
    </div>)
}