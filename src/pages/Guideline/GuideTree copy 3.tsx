import React, { useEffect, useState } from "react";
import { Tree, Input, Button, Checkbox } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./Guideline.css";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
const { TreeNode } = Tree;
const treeDataSample = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];

// const getAllKeys = (data: any) => {
//   // This function makes an array of keys, this is specific for this example, you would have to adopt for your case. If your list is dynamic, also make sure that you call this function everytime data changes.
//   const nestedKeys = data.map((node: any) => {
//     let childKeys: any = [];
//     if (node.children) {
//       childKeys = getAllKeys(node.children);
//     }
//     return [childKeys, node.key];
//   });
//   return flattenDeep(nestedKeys);
// };
const renderTreeNodes = (data: any): any => {
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const renderTitle = (item: any) => (
    <div className="tree-node-guideline">
      <Button type="primary" icon={<PlusOutlined />} size={"small"} />
      <Checkbox
        className="tree-node-guide-checkbox"
        onChange={onChangeCheckbox}
      />
      <Input
        className="tree-node-guide-text"
        value={item.title}
        placeholder="Guideline name"
      />
      <Button
        className="tree-node-guide-btn-delete"
        icon={<CloseOutlined />}
        size={"small"}
      />
    </div>
  );
  return data.map((item: any) => {
    if (!item.children) {
      return <TreeNode key={item.key} title={renderTitle(item)} />;
    }
    return (
      <TreeNode title={renderTitle(item)} key={item.key}>
        {renderTreeNodes(item.children)}
      </TreeNode>
    );
  });
};

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}
const GuideTree = () => {
  const [treeData, setTreeData] = useState<any[]>(treeDataSample);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([
    "0-1-0-0",
    "0-1-0-0",
    "0-0-0-0",
  ]);
  const onExpand = (newExpandedKeys: any) => {
    console.log("onExpand", newExpandedKeys);
    //setExpandedKeys(expandedKeys);
  };
  return (
    <Tree
      onExpand={onExpand}
      // switcherIcon={<div />}
      expandedKeys={expandedKeys}
    >
      {renderTreeNodes(treeData)}
    </Tree>
  );
};
export default GuideTree;
