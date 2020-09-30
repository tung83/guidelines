import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import "./Guideline.css";
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
const TreeNodes = (data: any) =>
  data.map((item: any) => {
    debugger;
    if (item.children) {
      return (
        <TreeNode title={<div>{item.title}</div>} key={item.key}>
          {TreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={<h2>{item.title}</h2>} {...item} />;
  });

const GuideTree = () => {
  const [treeData, setTreeData] = useState<any[]>(treeDataSample);
  debugger;
  // useEffect(() => {
  //   const keys = getAllKeys(treeData);
  //   setExpandedKeys(keys);
  // }, [treeData]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['"0-1-0-0']);
  const onExpand = (expandedKeys: any) => {
    console.log("onExpand", expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
  };
  return (
    <Tree onExpand={onExpand} expandedKeys={expandedKeys}>
      <TreeNodes treeData={treeData} />
    </Tree>
  );
};
export default GuideTree;
