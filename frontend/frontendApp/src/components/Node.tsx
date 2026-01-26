import type { NodeData } from "../types/NodeData";

type Props = { node: NodeData };

export default function Node({ node }: Props) {
  const cpuWarn = node.cpuUsage >= 80;

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-start justify-between">
        <h2 className="font-bold">{node.name}</h2>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            node.status === "online"
              ? "bg-green-100 text-green-800"
              : node.status === "offline"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-900"
          }`}
        >
          {node.status}
        </span>
      </div>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between rounded-lg border bg-black/5 px-3 py-2">
          <span className="font-medium text-black">CPU</span>

          <div className="flex items-center gap-2">
            <span
              className={
                cpuWarn
                  ? "font-semibold text-red-600"
                  : "font-medium text-black"
              }
            >
              {node.cpuUsage}%
            </span>

            {cpuWarn && (
              <img src="/warning.svg" alt="High CPU" className="h-4 w-4" />
            )}
          </div>
        </div>

        <div className="flex justify-between rounded-lg border bg-black/5 px-3 py-2">
          <span className="font-medium text-black">Memory</span>
          <span className="font-medium text-black">{node.memoryUsage} GB</span>
        </div>
      </div>
    </div>
  );
}
