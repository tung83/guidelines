export interface NodeData {
  key: string;
  Id: number;
  SupId: number | null;
  Name: string;
  Order: number;
  children: Node[];
}
export interface NodeContent {
  nodeId: number;
  Content: string;
}
