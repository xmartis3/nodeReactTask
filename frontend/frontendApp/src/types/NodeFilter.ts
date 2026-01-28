import { Status } from "./NodeStatus";

export const FILTERS = ["all", ...Object.values(Status)] as const;
export type Filter = (typeof FILTERS)[number];
