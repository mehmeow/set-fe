import React, { useEffect } from "react";
import { Row, Col, ButtonGroup, Button, CardGroup, Card } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
// import { formatNumber } from '../Helper/HelperFunctions';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { ACTION_REQUEST_DATA } from "../redux/actions/manageDataActions";
import { ACTION_ADD_ITEM } from "../redux/actions/cartActions";
require('dotenv').config();

const useStyles = createUseStyles({
  card: {
    padding: 20,
    marginBottom: 10
  }
});

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const EachProduct = ({ item, addCart }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <h3>{item.name}</h3>
      <p>Price: RM {formatNumber(item.price)}</p>
      <p>{item.description.substring(0, 75)} ...</p>
      <div>
        <ButtonGroup aria-label="Actions button">
          <Button variant="secondary" onClick={() => addCart(item)}>Add to cart</Button>
        </ButtonGroup>
      </div>
    </Card>
  )
}

const Products = (props) => {
  const productStore = useSelector(state => state.MANAGE_DATA.data_products);
  const dispatch = useDispatch();

  async function callProducts() {
    await fetch(`${process.env.REACT_APP_API}/products`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        dispatch(ACTION_REQUEST_DATA("data_products", response));
      });
  }

  async function addCart(item) {
    // console.log("RESPONSE", item);
    await fetch(`${process.env.REACT_APP_API}/cart/addcart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(response => {
        dispatch(ACTION_ADD_ITEM({ ...item, ...response.order }));
        console.log("RESPONSE", response);
      });
  }

  useEffect(() => {
    callProducts();
  }, []);

  return (
    <Row>
      {
        productStore.data.map((item) => {
          return (
            <Col key={item.product_id} md={4}><EachProduct item={item} addCart={addCart} /></Col>
          );
        })
      }
    </Row>
  )
}

// export default component
export default Products;