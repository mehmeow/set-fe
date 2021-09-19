import React from 'react';
import {Products} from '../components';
import {Container, Row,Col} from 'react-bootstrap';

export default function Page(){
  return(
    <Container>
      <Row>
        <Col><h1>Products</h1></Col>
      </Row>
      <Products />
    </Container> 
  )
}