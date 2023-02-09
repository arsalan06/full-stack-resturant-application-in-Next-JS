import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Table, Button } from "antd";
const { Text, Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/Cart.module.css";
import Image from "next/image";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Cart = () => {
  const amount = "2";
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const [open, setOpen]=useState(false)
  const cart = useSelector((state) => state.cart);
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.Cart_main_container}>
      <Row justify="center">
        <Col lg={14} span={12}>
          <table>
            <tr className={styles.Cart_row}>
              <th>Image</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {cart.products.map((item) => (
              <tr key={item.id} className={styles.Cart_row}>
                <td>
                  <Image src={item.img} width={80} height={80} alt="pizza" />
                </td>
                <td style={{ color: "#E61D2A", fontWeight: "bold" }}>
                  {item.title}
                </td>
                <td>
                  {item.extraOptions.map((extra) => (
                    <Text key={extra.id}>{extra.text}, </Text>
                  ))}
                </td>
                <td>{item.pizzaPrice}</td>
                <td>{item.pizzaQuantity}</td>
                <td style={{ color: "#E61D2A" }}>
                  ${item.pizzaPrice * item.pizzaQuantity}
                </td>
              </tr>
            ))}
          </table>
        </Col>

        <Col lg={6}>
          <div className={styles.Cart_payment_container}>
            <Title style={{ color: "white" }}>CART TOTAL</Title>
            <Typography  className={styles.Cart_payment_container_Text}>Subtotal:</Typography>
            <Typography className={styles.Cart_payment_container_Text}>Discount:</Typography>
            <Typography className={styles.Cart_payment_container_Text}>Total:</Typography>
            {open?(
              <div>
              <Button className={styles.Cart_ondelivery_button}>CHASH ON DELIVERY</Button>

                   <PayPalScriptProvider
              options={{
                "client-id": "test",
                components: "buttons",
                currency: "USD",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
              </div>
            ):(
              <Button className={styles.Cart_checkout_button} onClick={()=>setOpen(true)}>CHECKOUT NOW!</Button>
            )}
         
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
