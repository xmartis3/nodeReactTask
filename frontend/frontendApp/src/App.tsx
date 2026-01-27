import { useEffect, useState } from "react";
import Node from "./components/Node";
import axios from "axios";
import type { NodeData } from "./types/NodeData";

function App() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [filterData, setFilterData] = useState<string>("all");
  useEffect(() => {
    const fetchNodes = async () => {
      const res = await axios.get(`/api/nodes`);
      console.log(res);

      setNodes(res.data);
    };
    fetchNodes();
    setInterval(fetchNodes, 1000);
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-10">
      <span className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Nodes</h1>
        <select
          name="filter"
          className="border border-gray-600 rounded-2xl "
          id="filter"
          onChange={(e) => {
            setFilterData(e.target.value);
          }}
        >
          <option value="all">ALL</option>
          <option value="online">ONLINE</option>
          <option value="offline">OFFLINE</option>
          <option value="maintenance">MAINTENANCE</option>
        </select>
      </span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        {nodes
          .filter((node) => filterData === "all" || filterData === node.status)
          .map((node) => (
            <Node key={node.id} node={node} />
          ))}
      </div>
    </div>
  );
}

export default App;
