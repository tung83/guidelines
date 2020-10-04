export type Node = {
  Id: number;
  SupId: number;
  Name: string;
  Order: number;
  children: Node[];
  NodeContent: NodeContent;
};
export type NodeContent = {
  nodeId: number;
  Content: string;
};
