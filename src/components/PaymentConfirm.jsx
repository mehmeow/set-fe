import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Row, Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss'
// Redux
import { useDispatch, useSelector } from "react-redux";
import { ACTION_SEND_PAY, ACTION_UPDATE_CART } from "../redux/actions/cartActions";

const useStyles = createUseStyles({
  paymentBox: { padding: 10 },
  paymentCard: {
    padding: 0,
    cursor: "pointer",
    width: "100%",
    fontSize: "0.75rem"
  }
});

export default function PaymentConfirm({ show, handleClose }) {
  const classes = useStyles();
  const [tran, setTran] = useState("Random");
  const cartItems = useSelector(state => state.MANAGE_CART);
  const dispatch = useDispatch();

  function handleTransaction(e) {
    const { value } = e.target;
    setTran(value);
  }

  async function makePayment() {
    // send payment
    await fetch(`${process.env.REACT_APP_API}/cart/makepayment/${tran}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems.cart)
    })
      .then(res => res.json())
      .then(response => {
        dispatch(ACTION_SEND_PAY());
        handleClose();
        // redirect & reload
        window.location.replace("/history");
      });
  }

  return (
    <>
      <Offcanvas show={show} placement='bottom'>
        <Offcanvas.Header>
          <Offcanvas.Title>Confirm Payment</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col md={10}>
              <p>Please select your payment type</p>
              <Row>
                <Col md={3}>
                  <Card className={classes.paymentBox}>
                    <Form.Check
                      type="radio"
                      id="Random"
                      label={<div className={classes.paymentCard}>Random All<p>All item in cart will have the same success rate</p></div>}
                      name="payment"
                      value="Random"
                      checked={tran === "Random"}
                      onChange={handleTransaction}
                    />
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className={classes.paymentBox}>
                    <Form.Check
                      type="radio"
                      id="RandomEach"
                      label={<div className={classes.paymentCard}>Random Each<p>Each item in cart will have a different success rate</p></div>}
                      name="payment"
                      value="RandomEach"
                      checked={tran === "RandomEach"}
                      onChange={handleTransaction}
                    />
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className={classes.paymentBox}>
                    <Form.Check
                      type="radio"
                      id="Success"
                      label={<div className={classes.paymentCard}>Success<p>All item in cart will make success payment</p></div>}
                      name="payment"
                      value="Success"
                      checked={tran === "Success"}
                      onChange={handleTransaction}
                    />
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className={classes.paymentBox}>
                    <Form.Check
                      type="radio"
                      id="Failed"
                      label={<div className={classes.paymentCard}>Failed<p>All item in cart will make failed payment</p></div>}
                      name="payment"
                      value="Failed"
                      checked={tran === "Failed"}
                      onChange={handleTransaction}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <p>Pay now</p>
              <Button variant="primary" onClick={makePayment}>Confirm</Button>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}