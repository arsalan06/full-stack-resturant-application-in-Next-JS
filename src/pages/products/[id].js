import React from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/PizzaDetail.module.css";
import { Col, Layout, Row, Typography, Checkbox } from "antd";
import Item from "antd/es/list/Item";
const { Title, Paragraph, Text, Link } = Typography;
export default function PizzaDetail({ pizzaDetail }) {
  return (
    <Layout className={styles.pizzaDetail_main}>
      <Row>
        <Col lg={12}>
          <div>
            <Image src={pizzaDetail.img} width={300} height={300} alt="Pizza" />
          </div>
        </Col>
        <Col>
          <div>
            <Typography>
              <Title>{pizzaDetail.title}</Title>
              <Text strong>${pizzaDetail.price}</Text>
              <Paragraph>{pizzaDetail.desc}</Paragraph>
            </Typography>
          </div>
          <div>
            <Image
              src={`/img/small-pizza-icon.png`}
              width={50}
              height={50}
              alt="Pizza"
            />
            <Image
              src={`/img/larg-pizza-icon.png`}
              width={50}
              height={50}
              alt="Pizza"
            />
            <Image
              src={`/img/medium-pizza-icon.png`}
              width={50}
              height={50}
              alt="Pizza"
            />
          </div>
          <div>
            {pizzaDetail.extraOptions.map((option) => (
              <Checkbox key={option.id}>{option.text}</Checkbox>
            ))}
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
