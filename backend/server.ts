import * as fs from "fs";
import { NodeData, Status } from "./types/NodeData";
import { Response, Request } from "express";

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
    if (element.status !== Status.online) {
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
