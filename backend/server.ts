import * as fs from "fs";
import { NodeData } from "./types/NodeData";
import { Response, Request } from "express";
import { Status } from "./types/NodeStatus";

const express = require("express");
const app = express();
const PORT = Number(process.env.PORT ?? 5050);
const cors = require("cors");
const ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";

app.use(cors({ origin: ORIGIN }));

const data: NodeData[] = JSON.parse(
  fs.readFileSync(`${process.cwd()}/data/nodes.json`, "utf-8")
);

function changeUsage() {
  data.forEach((element) => {
    const num = Math.round(Math.random() * 10) % 3;

    switch (num) {
      case 0:
        element.status = Status.online;
        break;
      case 1:
        element.status = Status.offline;
        break;
      case 2:
        element.status = Status.maintenance;
        break;
      default:
        break;
    }

    if (element.status != Status.online) {
      element.cpuUsage = 0;
      element.memoryUsage = 0;
      return;
    }
    element.cpuUsage = Math.round(Math.random() * 100);
    element.memoryUsage = Math.round(Math.random() * 100) / 10;
    element.timestamp = new Date().toISOString();
  });
}

setInterval(changeUsage, 1000);
app.get("/api/nodes", (_req: Request, resp: Response) => {
  resp.send(data);
});

app.listen(PORT, () => {
  console.log(`Server started`);
});
