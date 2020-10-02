import React, { ChangeEvent, useEffect, useState } from "react";
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

const GuideMain = ({ guidelines, guidelineFetch }: any) => {
  const [selectedGuidelineName, setSelectedGuidelineName] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>();
  const [guidelineList, setGuidelineList] = useState<any>([]);
  const [oldText, setOldText] = useState<any>([]);
  const [value, setValue] = useState<any>();
  useEffect(() => {
    guidelineFetch();
  }, []);
  useEffect(() => {
    setGuidelineList(guidelines);
  }, [guidelines]);

  const changeGuidelineSelect = (value: SelectValue, option: any) => {
    setValue(value);
    setSelectedOption(option);
    setSelectedGuidelineName(value as string);
    setOldText(value);
    onGuidelineSelected(value.toString());
  };
  const handleTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedGuidelineName(event.target.value);
    var foundIndex = guidelineList.findIndex(
      (x: any) => x.Id == selectedOption.key
    );
    guidelineList[foundIndex].Name = event.target.value;
    setGuidelineList([...guidelineList]);
    setValue(event.target.value);
  };
  const saveTextChanged = (event: React.FocusEvent<HTMLInputElement>) => {
    if (oldText !== selectedGuidelineName) {
      setOldText(selectedGuidelineName);
      console.log("update name", oldText, selectedGuidelineName);
      guidelinePut(selectedOption.key, { Name: selectedGuidelineName });
    }
  };

  return (
    <section className="panel-box">
      <div className="panel-box-title">Guidline</div>
      <div className="panel-box-description">
        <Select
          className="guideline-select"
          showSearch
          value={value}
          optionFilterProp="children"
          onChange={changeGuidelineSelect}
          dropdownStyle={{ minWidth: "500px" }}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {guidelineList?.map((x: any) => (
            <Option value={x.Name} key={x.Id}>
              {x.Name}
            </Option>
          ))}
        </Select>
        <Input
          value={selectedGuidelineName}
          placeholder="Guideline name"
          onChange={handleTextChanged}
          onBlur={saveTextChanged}
        />
      </div>
    </section>
  );
};
export default connect(
  (state: any) => {
    return {
      guidelines: state.guideline.guidelines,
      currentGuideline: state.guideline.currentGuideline,
    };
  },
  {
    guidelineFetch,
    guidelinePut,
    onGuidelineSelected,
  }
)(GuideMain);
