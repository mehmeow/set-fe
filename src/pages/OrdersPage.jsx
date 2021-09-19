import React from 'react';
import { Orders } from '../components';
import { Container, Row, Col } from 'react-bootstrap';

export default function Page() {
  return (
    <Container>
      <Row>
        <Col><h1>Order Records</h1></Col>
        <Orders />
      </Row>
    </Container>
  )
}