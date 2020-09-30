import React from "react";
import { Select, Input } from "antd";
import "./Guideline.css";
const { Option } = Select;

const GuideMain = ({ guidelines }: any) => {
  const changeGuidelineSelect = () => {};
  return (
    <section className="panel-box">
      <div className="panel-box-title">Guidline</div>
      <div className="panel-box-description">
        <Select
          className="guideline-select"
          showSearch
          optionFilterProp="children"
          onChange={changeGuidelineSelect}
          dropdownStyle={{ minWidth: "500px" }}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {guidelines?.map((x: any) => (
            <Option value={x.Name} key={x.Name}>
              {x.Name}
            </Option>
          ))}
        </Select>
        <Input placeholder="Guideline name" />
      </div>
    </section>
  );
};
export default GuideMain;
