export type Status = "online" | "offline" | "maintenance";
export const STATUSES = ["online", "offline", "maintenance"] as const;

export const FILTERS = ["all", "online", "offline", "maintenance"] as const;
export type Filter = (typeof FILTERS)[number];
export type NodeData = {
  id: string;
  name: string;
  status: Status;
  cpuUsage: number;
  memoryUsage: number;
  timestamp: string;
};
