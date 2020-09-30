import React, { FC, useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "./AppBreadcrumb.css";

const AppBreadcrumb: FC = () => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>Thực đơn</Breadcrumb.Item>
      <Breadcrumb.Item>Hàng ngày</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export default AppBreadcrumb;
