export interface NodeData {
  key: string;
  _id: string;
  supId: string | null;
  name: string;
  order: number;
  subNodes: NodeData[];
}
export interface NodeContent {
  nodeId: number;
  content: string;
}
