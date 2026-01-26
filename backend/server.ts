import * as fs from "fs";

const express = require("express");
const app = express();
const PORT = 5050;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

type NodeData = {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  cpuUsage: number;
  memoryUsage: number;
  timestamp: string;
};

const data: NodeData[] = JSON.parse(
  fs.readFileSync("./data/nodes.json", "utf-8")
);

function changeUsage() {
  data.forEach((element) => {
    if (element.status !== "online") {
      return;
    }
    element.cpuUsage = Math.round(Math.random() * 100);
    element.memoryUsage = Math.round(Math.random() * 100) / 10;
    element.timestamp = new Date().toISOString();
  });
}
setInterval(changeUsage, 1000);
app.get("/api/nodes", (req: any, resp: any) => {
  resp.send(data);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
