export type NodeData = {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  cpuUsage: number;
  memoryUsage: number;
  timestamp: string;
};
