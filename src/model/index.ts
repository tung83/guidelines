export interface NodeData {
  key: string;
  Id: number;
  SupId: number;
  Name: string;
  Order: number;
  children: Node[];
  NodeContent: NodeContent;
}
export interface NodeContent {
  nodeId: number;
  Content: string;
}
