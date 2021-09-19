import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Card } from 'react-bootstrap';
// import { formatNumber, getSum } from '../Helper/HelperFunctions';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { ACTION_GET_CART, ACTION_REMOVE_ITEM } from "../redux/actions/cartActions";

// return thousand number format
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const Item = ({ order_id, price, name }, removeOrder) => {
  return (
    <Card key={order_id} style={{ marginBottom: 10 }}>
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p><strong>{name}</strong><br />{formatNumber(price)}</p>
          <Button variant="danger" onClick={() => removeOrder(order_id)}>remove</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

const SummaryTotal = ({ sumtotal, handleClose }) => {
  return (
    <div>
      <h3>Total:<span style={{ float: 'right' }}>RM {formatNumber(sumtotal)}</span></h3>
      <Link to={`/payment`}>
        <Button
          style={{ width: '100%' }}
          variant="primary"
          onClick={handleClose}
        >
          Pay now
        </Button>
      </Link>
    </div>
  );
}

export default function Cart({ show, handleClose, ...props }) {
  const cartItems = useSelector(state => state.MANAGE_CART);
  const dispatch = useDispatch();

  async function removeOrder(order_id) {
    await fetch(`${process.env.REACT_APP_API}/cart/removeone/${order_id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(response => dispatch(ACTION_REMOVE_ITEM(order_id)));
  }

  useEffect(async () => {
    // get cart
    await fetch(`${process.env.REACT_APP_API}/cart`)
      .then(res => res.json())
      .then(response => dispatch(ACTION_GET_CART(response)));
  }, []);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart ({cartItems.count})</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.cart.length > 0 ? <>
            {cartItems.cart.map(item => Item(item, removeOrder))}
            <SummaryTotal {...{ sumtotal: cartItems.sum, handleClose }} />
          </> : <div><p>no item</p><Button onClick={handleClose}>Shop now</Button></div>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}