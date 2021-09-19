import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import { Container, Row, Col, Button } from 'react-bootstrap';

const useStyles = createUseStyles({
  welcome: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function Page() {
  const classes = useStyles();

  return (
    <Container className={classes.welcome}>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <h1>Welcome to App demo</h1>
          <Link to={`/products`}><Button variant="primary">Login</Button></Link>
        </Col>
      </Row>
    </Container>
  )
}