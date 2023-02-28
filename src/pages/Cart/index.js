import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Table, Button } from "antd";
const { Text, Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/Cart.module.css";
import Image from "next/image";
import CheckoutForm from "./checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const Cart = () => {
  const stripePromise = loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const cart = useSelector((state) => state.cart);
  // useEffect(()=>{
  //   document.getElementById("submit").style.width="100%"
  // //  payButton.style.width="100%"
  // },[clientSecret])
  const handleCheckOut = () => {
    console.log("api call handler")
    setOpen(true);
    const data = {
      name: "gggg",
      total: "66666",
    };
    axios
      .post("http://localhost:3000/api/create-payment-intent", { data })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
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
            <Typography className={styles.Cart_payment_container_Text}>
              Subtotal:
            </Typography>
            <Typography className={styles.Cart_payment_container_Text}>
              Discount:
            </Typography>
            <Typography className={styles.Cart_payment_container_Text}>
              Total:
            </Typography>
            {open ? (
              <div>
                <Button className={styles.Cart_ondelivery_button}>
                  CHASH ON DELIVERY
                </Button>
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                )}
              </div>
            ) : (
              <button
                className={styles.Cart_checkout_button}
                onClick={handleCheckOut}
              >
                CHECKOUT NOW!
              </button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
