import React, { FC, useState } from "react";
import { Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./LeftMenu.css";

const LeftMenu: FC = () => {
  const [current, setCurrent] = useState<string>("");
  const handleClick = (e: MenuInfo) => {
    console.log("click ", e);
    setCurrent(e.key as string);
  };
  const { SubMenu } = Menu;
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["mail"]}
      style={{ height: "100%" }}
    >
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Loại thực phẩm
        <Link to="/foodtype" />
      </Menu.Item>
      <Menu.Item key="app" icon={<AppstoreOutlined />}>
        Thực đơn
        <Link to="/menu-setup" />
      </Menu.Item>
    </Menu>
  );
};
export default LeftMenu;
