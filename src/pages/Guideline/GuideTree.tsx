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
import {
  guideNodeContentFetchDetail,
  guideNodeContentReset,
} from "../../store/guideNodeContent/action";
import {
  findNode,
  flatten,
  removeNode,
  moveNode,
  orderNode,
  updateNodeKey,
} from "../../utils/useNode";
import GuideTreeNode from "./GuideTreeNode";
import { NodeData } from "model";
import { EventDataNode } from "antd/lib/tree";
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
    } else {
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
    }
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
  guideNodeContentReset: any;
  guideNodeSetCurrent: any;
  nodeNavDirection: string;
  currentGuideNode: NodeData;
  nodeNavTurn: any;
  guidelineViewMode: boolean;
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
  guideNodeContentReset,
  guideNodeSetCurrent,
  nodeNavDirection,
  currentGuideNode,
  nodeNavTurn,
  guidelineViewMode,
}: GuideTreeProps) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [newIndex, setNewIndex] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    const dataList = updateNodeKey(currentChildNodes);
    setTreeData(dataList);
    setExpandedKeys(flatten(dataList));
  }, [currentChildNodes]);
  // update childnode of newly inserted
  useEffect(() => {
    guideNodesInserted.forEach((x: NodeData) => {
      let foundNode = findNode(treeData, (y: NodeData) => y.key === x.key);
      if (foundNode) {
        foundNode._id = x._id;
      }
    });
    setTreeData([...treeData]);
  }, [guideNodesInserted]);
  //move node
  useEffect(() => {
    if (nodeNavDirection) {
      nodeNavTurn(null);
      let movedNodes = moveNode(treeData, currentGuideNode, nodeNavDirection);
      if (movedNodes && movedNodes.length) {
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
      name: "Tiêu đề node",
      order: order + 1,
      supId: parent._id,
      subNodes: [],
    };
    parent.subNodes.push(newItem);
    processAddNewNode(treeData, newItem);
  };

  const handleAddNewNodeInRoot = () => {
    if (!guidelineSelected) return;
    setNewIndex(newIndex - 1);
    const newKey = `${newIndex - 1}`;
    const order =
      treeData.length === 0 ? 1 : treeData[treeData.length - 1].order + 1;
    const newItem: NodeData = {
      key: newKey,
      _id: newKey,
      name: "Tiêu đề node",
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
    guideNodePost({
      supId: newItem.supId,
      order: newItem.order,
      key: newItem.key,
    });
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
    if (node) {
      guideNodeContentFetchDetail(node._id);
    } else {
      guideNodeContentReset();
    }
    guideNodeSetCurrent(node);
  };
  const onExpand = (
    keys: React.Key[],
    info: {
      node: EventDataNode;
      expanded: boolean;
      nativeEvent: MouseEvent;
    }
  ) => {
    setExpandedKeys(keys.map((x) => x.toString()));
  };

  return (
    <Tree
      switcherIcon={!guidelineViewMode ? <div /> : undefined}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
    >
      <TreeNode
        key={"root"}
        title={
          !guidelineViewMode && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size={"small"}
              onClick={(e: any) => handleAddNewNodeInRoot()}
            />
          )
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
      )
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
      guidelineViewMode: state.guideline.guidelineViewMode,
    };
  },
  {
    guideNodePost,
    guideNodePut,
    guideNodeLocationPut,
    guideNodeDelete,
    resetGuideNodesInserted,
    guideNodeContentFetchDetail,
    guideNodeContentReset,
    guideNodeSetCurrent,
    nodeNavTurn,
  }
)(GuideTree);
