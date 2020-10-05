import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Tree } from "antd";
import { nodeNavTurn } from "../../store/nodeNav/action";
import "./Guideline.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  guideNodePut,
  guideNodeLocationPut,
  guideNodePost,
  guideNodeDelete,
  resetGuideNodesInserted,
  guideNodeSetCurrent,
} from "../../store/guideNode/action";
import { guideNodeContentFetchDetail } from "../../store/guideNodeContent/action";
import {
  findNode,
  flatten,
  removeNode,
  moveNode,
  orderNode,
} from "../../utils/useNode";
import GuideTreeNode from "./GuideTreeNode";
import { NodeData } from "model";
const { TreeNode } = Tree;

export interface TreeNodesProps {
  treeNodes: NodeData[];
  handleAddNewNode: any;
  handleDeleteNode: any;
  handleItemNameChanged: any;
  handleItemCheckChanged: any;
}
const renderTreeNodes = ({
  treeNodes,
  handleAddNewNode,
  handleDeleteNode,
  handleItemNameChanged,
  handleItemCheckChanged,
}: TreeNodesProps): any => {
  const orderedData = orderNode(treeNodes);
  return orderedData.map((item) => {
    if (!item.subNodes || item.subNodes.length === 0) {
      return (
        <TreeNode
          key={`${item.key}-${item.order}`}
          title={
            <GuideTreeNode
              item={item}
              handleAddNewNode={handleAddNewNode}
              handleDeleteNode={handleDeleteNode}
              handleItemNameChanged={handleItemNameChanged}
              handleItemCheckChanged={handleItemCheckChanged}
            />
          }
        />
      );
    }
    return (
      <TreeNode
        key={`${item.key}-${item.order}`}
        title={
          <GuideTreeNode
            item={item}
            handleAddNewNode={handleAddNewNode}
            handleDeleteNode={handleDeleteNode}
            handleItemNameChanged={handleItemNameChanged}
            handleItemCheckChanged={handleItemCheckChanged}
          />
        }
      >
        {renderTreeNodes({
          treeNodes: item.subNodes,
          handleAddNewNode,
          handleDeleteNode,
          handleItemNameChanged,
          handleItemCheckChanged,
        })}
      </TreeNode>
    );
  });
};

export interface GuideTreeProps {
  guidelineSelected: NodeData;
  currentChildNodes: NodeData[];
  guideNodePut: any;
  guideNodeLocationPut: any;
  guideNodePost: any;
  guideNodeDelete: any;
  guideNodesInserted: NodeData[];
  guideNodeContentFetchDetail: any;
  guideNodeSetCurrent: any;
  nodeNavDirection: string;
  currentGuideNode: NodeData;
  nodeNavTurn: any;
}
const GuideTree = ({
  guidelineSelected,
  currentChildNodes,
  guideNodePut,
  guideNodeLocationPut,
  guideNodePost,
  guideNodeDelete,
  guideNodesInserted,
  guideNodeContentFetchDetail,
  guideNodeSetCurrent,
  nodeNavDirection,
  currentGuideNode,
  nodeNavTurn,
}: GuideTreeProps) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [newIndex, setNewIndex] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    const dataList = currentChildNodes.map((x: NodeData) => ({
      ...x,
      key: x._id,
    }));
    setTreeData(dataList);
    setExpandedKeys(flatten(dataList));
  }, [currentChildNodes]);
  // update childnode of newly inserted
  useEffect(() => {
    guideNodesInserted.forEach((x: NodeData) => {
      let foundNode = findNode(treeData, (y: NodeData) => y.key === x.key);
      if (foundNode) {
        foundNode._id = x._id;
        foundNode.key = x._id;
      }
    });
    setTreeData([...treeData]);
  }, [guideNodesInserted]);
  //move node
  useEffect(() => {
    if (nodeNavDirection) {
      nodeNavTurn(null);
      let movedNodes = moveNode(treeData, currentGuideNode, nodeNavDirection);
      setTreeData([...treeData]);
      setExpandedKeys(flatten(treeData));
      guideNodeLocationPut(
        movedNodes?.map((x) => ({
          _id: x._id,
          supId: x.supId,
          order: x.order,
        }))
      );
    }
  }, [nodeNavDirection]);

  const handleAddNewNode = (parent: NodeData) => {
    if (!parent.subNodes) {
      parent.subNodes = [];
    }
    setNewIndex(newIndex - 1);
    const newKey = `${newIndex - 1}`;
    const order =
      parent.subNodes.length === 0
        ? 1
        : parent.subNodes[parent.subNodes.length - 1].order;
    const newItem: NodeData = {
      key: newKey,
      _id: newKey,
      name: "",
      order: order + 1,
      supId: parent._id,
      subNodes: [],
    };
    parent.subNodes.push(newItem);
    processAddNewNode(treeData, newItem);
  };

  const handleAddNewNodeInRoot = () => {
    setNewIndex(newIndex - 1);
    const newKey = `${newIndex - 1}`;
    const order =
      treeData.length === 0 ? 1 : treeData[treeData.length - 1].order + 1;
    const newItem: NodeData = {
      key: newKey,
      _id: newKey,
      name: "",
      order: order,
      supId: guidelineSelected._id,
      subNodes: [],
    };
    treeData.push(newItem);
    processAddNewNode(treeData, newItem);
  };
  const processAddNewNode = (newTreeData: NodeData[], newItem: NodeData) => {
    setTreeData([...newTreeData]);
    setExpandedKeys([...expandedKeys, `${newItem.key}-${newItem.order}`]);
    guideNodePost({ supId: newItem.supId, order: newItem.order });
  };
  const handleDeleteNode = (node: NodeData) => {
    guideNodeDelete(node._id);
    removeNode(treeData, node);
    setTreeData([...treeData]);
  };
  const handleItemNameChanged = (node: NodeData) => {
    let foundNode = findNode(treeData, (y: NodeData) => y.key === node.key);
    if (foundNode) foundNode.name = node.name;
    setTreeData([...treeData]);
    guideNodePut({ _id: node._id, name: node.name });
  };
  const handleItemCheckChanged = (node: NodeData) => {
    guideNodeContentFetchDetail(node._id);
    guideNodeSetCurrent(node);
  };

  return (
    <Tree switcherIcon={<div />} expandedKeys={expandedKeys}>
      <TreeNode
        key={"root"}
        title={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"small"}
            onClick={(e: any) => handleAddNewNodeInRoot()}
          />
        }
      >
        {renderTreeNodes({
          treeNodes: treeData,
          handleAddNewNode,
          handleDeleteNode,
          handleItemNameChanged,
          handleItemCheckChanged,
        })}
      </TreeNode>
    </Tree>
  );
};

export default connect(
  (state: any) => {
    return {
      guidelineSelected: state.guideline.guidelineSelected,
      currentChildNodes: state.guideline.currentChildNodes,
      guideNodesInserted: state.guideNode.guideNodesInserted,
      currentGuideNode: state.guideNode.currentGuideNode,
      nodeNavDirection: state.nodeNav.direction,
    };
  },
  {
    guideNodePost,
    guideNodePut,
    guideNodeLocationPut,
    guideNodeDelete,
    resetGuideNodesInserted,
    guideNodeContentFetchDetail,
    guideNodeSetCurrent,
    nodeNavTurn,
  }
)(GuideTree);
