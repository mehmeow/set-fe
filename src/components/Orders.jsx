import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Card } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import { ArrowRight } from 'react-bootstrap-icons';
// import { formatNumber } from '../Helper/HelperFunctions';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { ACTION_ADD_ITEM } from "../redux/actions/cartActions";
import { ACTION_GET_HISTORY } from "../redux/actions/ordersActions";

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const useStyles = createUseStyles({
  list: {
    padding: 20,
    marginBottom: 10,
    width: "100%",
  }
});

const ViewOrder = (props) => {
  const { open } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>{open?.status_text}</h4>
        <p>
          <strong>{open?.name}</strong><br />
          {open?.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Orders = (props) => {
  const ordersStore = useSelector(state => state.MANAGE_ORDER);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState({});

  const handleView = (item) => {
    setOpen(item);
  }

  async function callHistory() {
    await fetch(`${process.env.REACT_APP_API}/cart/history`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        dispatch(ACTION_GET_HISTORY(response));
        console.log(ordersStore);
      });
  }

  useEffect(() => {
    callHistory();
  }, []);

  return (
    <>
      <Row>
        <Col>
          {
            ordersStore.cart.map((item) => {
              return (
                <Card className={classes.list} key={item.order_id}>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <h6>{item.name}</h6>
                        </Col>
                        <Col><h6 style={{ textAlign: "right" }}><strong>RM {formatNumber(item.price)}</strong></h6></Col>
                      </Row>
                      <p>{item.description.substring(0, 75)}</p>
                    </Col>
                    <Col md={2}>
                      <p style={{ margin: 0 }}><small>Status</small><br />{item.status_text}</p>
                      <Button variant="primary" size="sm" onClick={() => handleView(item)}>view <ArrowRight /></Button>
                    </Col>
                  </Row>
                </Card>
              );
            })
          }
        </Col>
      </Row>
      <ViewOrder
        show={Object.keys(open).length > 0}
        onHide={() => setOpen({})}
        open={open}
      />
    </>
  )
}

// export default component
export default Orders;