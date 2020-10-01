import React from "react";
import { connect } from "react-redux";
import { Select, Input } from "antd";
import "./Guideline.css";
import {
  guidelineFetch,
  guidelinePut,
  onGuidelineSelected,
} from "../../store/guideline/action";
import { SelectValue } from "antd/lib/select";
const { Option } = Select;

const GuideMain = ({ guidelines }: any) => {
  const changeGuidelineSelect = (value: SelectValue) => {
    onGuidelineSelected(value);
  };
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
            <Option value={x.Name} key={x.Id}>
              {x.Name}
            </Option>
          ))}
        </Select>
        <Input placeholder="Guideline name" />
      </div>
    </section>
  );
};
export default connect(
  (state: any) => {
    return {
      guidelines: state.guideline.guidelines,
      currentGuideline: state.menu.currentGuideline,
    };
  },
  {
    guidelineFetch,
    guidelinePut,
    onGuidelineSelected,
  }
)(GuideMain);
