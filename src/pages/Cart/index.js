import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Table, Button } from "antd";
const { Text, Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/Cart.module.css";
import { CheckoutForm } from "@/components/CheckoutForm/CheckoutForm";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const Cart = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.NEXT_SECRET_STRIPE_SECRET_KEY,
  };
  console.log("payment");
  console.log("payment");
  console.log(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);
  console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  console.log(process.env.SECRET_KEY);
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
                {/* <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements> */}
                 <Button className={styles.Cart_ondelivery_button} onClick={()=>{
                  CheckoutForm({
                    lineItems:[{
                      price:"price_1MayY6I1ysbNcrp1yN7aXCe2",
                      quantity:1,
                    }]
                  })
                 }}>
                  PAY
                </Button>
              </div>
            ) : (
              <Button
                className={styles.Cart_checkout_button}
                onClick={() => setOpen(true)}
              >
                CHECKOUT NOW!
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
