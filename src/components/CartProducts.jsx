import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
// import {formatNumber, getSum} from '../helper/HelperFunctions';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { ACTION_REMOVE_ITEM } from "../redux/actions/cartActions";

import PaymentConfirm from './PaymentConfirm';

// return thousand number format
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// return sum of value
function getSum(items, key) {
  return items.reduce(function (a, b) {
    return a + b[key];
  }, 0);
};

const Item = ({ order_id, price, name }, removeOrder) => {
  return (
    <Card key={order_id} style={{ marginBottom: 10 }}>
      <Card.Body>
        <div>
          <p>{name}</p><p>RM {formatNumber(price)}</p>
          <Button variant="danger" onClick={() => removeOrder(order_id)}>remove</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

const SummaryTotal = ({ sumtotal, dummyLoading, load }) => {
  return (
    <div style={{ position: 'absolute', bottom: 0, padding: "20px 0", borderTop: "1px solid #dedede", width: '100%' }}>
      <Container>
        <Row>
          <Col>
            <h3>Total:<span style={{ float: 'right' }}>RM {formatNumber(sumtotal)}</span></h3>
            <Link to={`/payment`}>
              <Button
                style={{ width: '100%' }}
                variant="primary"
                onClick={dummyLoading}
              >
                {
                  load ? <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <span>Pay now</span>
                }
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function CartProducts() {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);

  const cartItems = useSelector(state => state.MANAGE_CART);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  async function removeOrder(order_id) {
    await fetch(`${process.env.REACT_APP_API}/cart/removeone/${order_id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(response => dispatch(ACTION_REMOVE_ITEM(order_id)));
  }

  // dummy loading delay
  function dummyLoading() {
    setLoad(true);
    setTimeout(() => {
      setShow(true);
      setLoad(false);
    }, 1000);
  }
  console.log(cartItems);

  return (
    <>
      <Container>
        <Row>
          <Col>
            {cartItems.cart.map((item) => Item(item, removeOrder))}
          </Col>
        </Row>
      </Container>
      <SummaryTotal {...{ sumtotal: cartItems.sum, dummyLoading, load }} />
      <PaymentConfirm {...{ show, handleClose }} />
    </>
  )
}