import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/PizzaDetail.module.css";
import { Col, Layout, Row, Typography, Checkbox, Input, Button } from "antd";
import { addProduct } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
const { Title, Paragraph, Text } = Typography;
export default function PizzaDetail({ pizzaDetail }) {
  const dispatch = useDispatch();
  const [pizzaSize, setPizzaSize] = useState(0);
  const [pizzaPrice, setPizzaPrice] = useState(pizzaDetail.price[0]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [pizzaQuantity, setPizzaQuantity] = useState(1);
  const handlePizzaPrice = (number) => {
    setPizzaPrice(pizzaPrice + number);
  };
  const handlePizzaSize = (sizeIndex) => {
    const difference =
      pizzaDetail.price[sizeIndex] - pizzaDetail.price[pizzaSize];
    setPizzaSize(sizeIndex);
    handlePizzaPrice(difference);
  };
  const handleExtraOptions = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      handlePizzaPrice(option.price);
      setExtraOptions((prev) => [...prev, option]);
    } else {
      handlePizzaPrice(-option.price);
      setExtraOptions(extraOptions.filter((extra) => extra._id !== option._id));
    }
  };
  const handleAddToCart = () => {
    dispatch( 
    addProduct({...pizzaDetail, extraOptions, pizzaPrice, pizzaQuantity})

     )
  };
  return (
    <Layout className={styles.pizzaDetail_main}>
      <Row>
        <Col lg={12}>
          <div className={styles.pizzaDetail_PizzaImage_container}>
            <Image src={pizzaDetail.img} width={300} height={300} alt="Pizza" />
          </div>
        </Col>
        <Col>
          <div className={styles.pizzaDetail_Info_container}>
            <div>
              <Typography>
                <Title>{pizzaDetail.title}</Title>
                <Text
                  strong
                  style={{
                    color: "#E61D2A",
                    textDecoration: "underline",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  ${pizzaPrice}
                </Text>
                <Paragraph>{pizzaDetail.desc}</Paragraph>
              </Typography>
            </div>
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <span className={styles.pizzaDetail_image_container}>
                <Image
                  src={`/img/small-pizza-icon.png`}
                  width={50}
                  height={50}
                  alt="Pizza"
                  onClick={() => handlePizzaSize(0)}
                />
                <span className={styles.pizzaDetail_image_tag}>Small</span>
              </span>
              <span className={styles.pizzaDetail_image_container}>
                <Image
                  src={`/img/larg-pizza-icon.png`}
                  width={50}
                  height={50}
                  alt="Pizza"
                  onClick={() => handlePizzaSize(1)}
                />
                <span className={styles.pizzaDetail_image_tag}>Medium</span>
              </span>
              <span className={styles.pizzaDetail_image_container}>
                <Image
                  src={`/img/medium-pizza-icon.png`}
                  width={50}
                  height={50}
                  alt="Pizza"
                  onClick={() => handlePizzaSize(2)}
                />
                <span className={styles.pizzaDetail_image_tag}>Large</span>
              </span>
            </div>
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <Text strong>Choose Additional Ingredients</Text>
              <br />
              {pizzaDetail.extraOptions.map((option) => (
                <Checkbox
                  key={option.id}
                  onChange={(e) => handleExtraOptions(e, option)}
                >
                  {option.text}
                </Checkbox>
              ))}
            </div>
            <div
              style={{
                marginTop: "25px",
              }}
            >
              {/* <Space size="small"> */}
              <Input
                type="number"
                style={{
                  width: "20%",
                }}
                value={pizzaQuantity}
                onChange={(e) => setPizzaQuantity(e.target.value)}
              />

              <Button
                style={{
                  background: "#E61D2A",
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
                onClick={handleAddToCart}
              >
                Add To Card
              </Button>
              {/* </Space> */}
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/product/${params.id}`);
  return {
    props: {
      pizzaDetail: res.data,
    },
  };
};
