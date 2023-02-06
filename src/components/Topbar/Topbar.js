import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import styles from "../styles/Topbar.module.css";
import { useSelector } from "react-redux";
import {
  AppstoreOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const Topbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const centerStyle = {
    // position: 'relative',
    background: "transparent",
    display: "flex",
    justifyContent: "flex-end",
    color: "white",
  };

  const rightStyle = { position: "absolute", top: 0, right: 0 };
  const items = [
    {
      label: "One",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Two",
      key: "app",
      icon: <AppstoreOutlined />,
      disabled: true,
    },
  ];
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* <div className={styles.Topbar_navigaion_container}> */}
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} align=/> */}
        <Menu style={centerStyle} mode="horizontal">
          <Menu.Item> Cookies </Menu.Item>
          <Menu.Item> Cookies </Menu.Item>
          <Menu.Item>
            {" "}
            <ShoppingCartOutlined /> <span>{quantity}</span>
          </Menu.Item>
          {/* <Menu.Item style={rightStyle}> Right </Menu.Item> */}
        </Menu>
        {/* </div> */}
      </Header>
    </Layout>
  );
};
export default Topbar;
