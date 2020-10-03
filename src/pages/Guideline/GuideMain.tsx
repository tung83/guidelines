import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Select, Input } from "antd";
import { NodeData } from "../../model";

import "./Guideline.css";
import {
  guidelineFetch,
  guidelineFetchDetail,
  guidelinePut,
  onGuidelineSelected,
} from "../../store/guideline/action";
import { SelectValue } from "antd/lib/select";
const { Option } = Select;

const GuideMain = ({
  guidelines,
  guidelineFetch,
  guidelinePut,
  guidelineFetchDetail,
}: any) => {
  const [selectedGuidelineName, setSelectedGuidelineName] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>();
  const [guidelineList, setGuidelineList] = useState<NodeData[]>([]);
  const [oldText, setOldText] = useState<any>();
  const [selectedValue, setSelectedValue] = useState<any>();
  useEffect(() => {
    guidelineFetch();
  }, []);
  useEffect(() => {
    setGuidelineList(guidelines);
  }, [guidelines]);

  const changeGuidelineSelect = (value: SelectValue, option: any) => {
    guidelineFetchDetail(option.key);
    setSelectedValue(value);
    setSelectedOption(option);
    setSelectedGuidelineName(value as string);
    setOldText(value);
    onGuidelineSelected(value.toString());
  };
  const findCurentNodeIndex = (): number => {
    return guidelineList.findIndex((x) => x.Id === Number(selectedOption.key));
  };
  const handleTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedGuidelineName(event.target.value);
    const foundIndex = findCurentNodeIndex();
    guidelineList[foundIndex].Name = event.target.value;
    setGuidelineList([...guidelineList]);
    setSelectedValue(event.target.value);
  };
  const saveTextChanged = (event: React.FocusEvent<HTMLInputElement>) => {
    if (oldText !== selectedGuidelineName) {
      setOldText(selectedGuidelineName);
      const foundIndex = findCurentNodeIndex();
      guidelinePut(selectedOption.key, {
        ...guidelineList[foundIndex],
        Name: selectedGuidelineName,
      });
    }
  };

  return (
    <section className="panel-box">
      <div className="panel-box-title">Guidline</div>
      <div className="panel-box-description">
        <Select
          className="guideline-select"
          showSearch
          value={selectedValue}
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
    guidelineFetchDetail,
    guidelinePut,
    onGuidelineSelected,
  }
)(GuideMain);
