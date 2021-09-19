import React from 'react';
import {CartProducts} from '../components';
import {Container, Row, Col} from 'react-bootstrap';

export default function Page(){
  return(
    <>
      <Container>
        <Row>
          <Col><h1>Payment</h1></Col>
        </Row>
      </Container>
      <CartProducts />
    </>
  )
}