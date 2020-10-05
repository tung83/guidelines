import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Select, Input } from "antd";
import { NodeData } from "../../model";

import "./Guideline.css";
import {
  guidelineFetch,
  guidelineFetchDetail,
  onGuidelineSelected,
} from "../../store/guideline/action";
import { guideNodePut } from "../../store/guideNode/action";
import { SelectValue } from "antd/lib/select";
const { Option } = Select;

export interface GuideMainProps {
  guidelines: NodeData[];
  guidelineFetch: any;
  guideNodePut: any;
  guidelineFetchDetail: any;
  onGuidelineSelected: any;
}
const GuideMain = ({
  guidelines,
  guidelineFetch,
  guideNodePut,
  guidelineFetchDetail,
  onGuidelineSelected,
}: GuideMainProps) => {
  const [selectedGuidelineName, setSelectedGuidelineName] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>();
  const [guidelineList, setGuidelineList] = useState<NodeData[]>([]);
  const [oldText, setOldText] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<SelectValue>();
  useEffect(() => {
    guidelineFetch();
  }, []);
  useEffect(() => {
    setGuidelineList(guidelines.map((x) => ({ ...x, key: x._id.toString() })));
  }, [guidelines]);

  const changeGuidelineSelect = (value: SelectValue, option: any) => {
    guidelineFetchDetail(option.key);
    setSelectedValue(value);
    setSelectedOption(option);
    const strValue = value as string;
    setSelectedGuidelineName(strValue);
    setOldText(strValue);
    onGuidelineSelected(guidelineList.find((x) => x.key === option.key));
  };
  const findCurentNodeIndex = (): number => {
    return guidelineList.findIndex((x) => x.key === selectedOption.key);
  };
  const handleTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedGuidelineName(event.target.value);
    const foundIndex = findCurentNodeIndex();
    guidelineList[foundIndex].name = event.target.value;
    setGuidelineList([...guidelineList]);
    setSelectedValue(event.target.value);
  };
  const saveTextChanged = (event: React.FocusEvent<HTMLInputElement>) => {
    if (oldText !== selectedGuidelineName) {
      setOldText(selectedGuidelineName);
      guideNodePut({ _id: selectedOption.key, name: selectedGuidelineName });
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
            <Option value={x.name} key={x.key}>
              {x.name}
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
    guideNodePut,
    onGuidelineSelected,
  }
)(GuideMain);
