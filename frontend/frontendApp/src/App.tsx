import { useEffect, useMemo, useState } from "react";
import Node from "./components/Node";
import type { NodeData } from "./types/NodeData";
import axios from "axios";
import { FILTERS, type Filter } from "./types/NodeFilter";

function App() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [filterData, setFilterData] = useState<Filter>("all");
  const filteredNodes: NodeData[] = useMemo(() => {
    return nodes.filter(
      (node) => filterData == FILTERS[0] || filterData == node.status
    );
  }, [nodes, filterData]);

  useEffect(() => {
    const fetchNodes = async () => {
      const res = await axios.get<NodeData[]>(`/api/nodes`);
      setNodes(res.data);
    };

    fetchNodes();
    const id = setInterval(fetchNodes, 1000);
    return () => clearInterval(id);
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
            const val: Filter = e.target.value.toLowerCase() as Filter;
            if (FILTERS.includes(val)) {
              setFilterData(val);
            }
          }}
        >
          {FILTERS.map((status) => (
            <option key={status}>{status.toUpperCase()}</option>
          ))}
        </select>
      </span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        {filteredNodes.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}

export default App;
