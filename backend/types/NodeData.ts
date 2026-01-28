import { Status } from "./NodeStatus";

export type NodeData = {
  id: string;
  name: string;
  status: Status;
  cpuUsage: number;
  memoryUsage: number;
  timestamp: string;
};
