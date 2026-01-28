export enum Status {
  online = "online",
  offline = "offline",
  maintenance = "maintenance"
}

export type NodeData = {
  id: string;
  name: string;
  status: Status;
  cpuUsage: number;
  memoryUsage: number;
  timestamp: string;
};
