import React from "react";
import { Card } from "antd";
import Image from "next/image";
const { Meta } = Card;
import styles from "@/styles/Pizzalist.module.css";
import Link from "next/link";
const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.pizzaList_main_container}>
      {pizzaList?.map((item) => (
        <Link href={`/products/${item._id}`} key={item.id}>
          <Card 
            className={styles.pizzaList_card}
            hoverable
            style={{ width: 240 }}
            cover={
              <Image alt="example" width={100} height={150} src={item.img} />
            }
          >
            <Meta title={item.desc} description="www.instagram.com" />
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PizzaList;
