
import type{ Request, Response } from "express";
import { Log } from "../middleware/logger.js";
import type { Notification, APIResponse, NotificationType } from "../types/index.js";
import { MaxHeap } from "../utills/pq.js";

const BASE = "http://4.224.186.213/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYWRhcmljaGFuZHJhc2VraGFybmFpZHUuMjMuaXRAYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTk3MTQyLCJpYXQiOjE3ODIxOTYyNDIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJlYTU1ZWMyNy0zMDMzLTQzMTUtYmNhZi1jZmE3ODRhODljN2QiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYWRhcmkgY2hhbmRyYSBzZWtoYXIgbmFpZHUiLCJzdWIiOiI0OTY2MGEzMi1iNmNmLTQzMTAtYmU1MS02Yjg1NzAwYjU2YzkifSwiZW1haWwiOiJrYWRhcmljaGFuZHJhc2VraGFybmFpZHUuMjMuaXRAYW5pdHMuZWR1LmluIiwibmFtZSI6ImthZGFyaSBjaGFuZHJhIHNla2hhciBuYWlkdSIsInJvbGxObyI6ImEyMzEyNjUxMTAyNCIsImFjY2Vzc0NvZGUiOiJNVHF4YXIiLCJjbGllbnRJRCI6IjQ5NjYwYTMyLWI2Y2YtNDMxMC1iZTUxLTZiODU3MDBiNTZjOSIsImNsaWVudFNlY3JldCI6ImNBVUhUamZKRlpqaGVrVHgifQ.GPJ18TnsRGmwg9SpMNiT2jnS-ydLr7XkCy1xfH_MIgI";

async function fetchFromAPI(params: Record<string, string> = {}): Promise<Notification[]> {
  const query = new URLSearchParams({ limit: "100", ...params }).toString();
  const res = await fetch(`${BASE}?${query}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  if (!res.ok) {
    await Log("backend", "error", "db", `Upstream API error: ${res.status}`);
    throw new Error(`Upstream API failed: ${res.status}`);
  }

  const data = (await res.json()) as APIResponse;
  return data.notifications ?? [];
}

export async function getAllNotifications(req: Request, res: Response): Promise<void> {
  try {
    const { page = "1", limit = "10", notification_type } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      await Log("backend", "warn", "handler", "Invalid pagination params");
      res.status(400).json({ error: "page and limit must be positive integers" });
      return;
    }

    const params: Record<string, string> = {};
    if (notification_type) params["notification_type"] = notification_type as string;

    const all = await fetchFromAPI(params);

  
    const total = all.length;
    const paginated = all.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    await Log("backend", "info", "handler", `Fetched ${total} notifications page=${pageNum}`);

    res.status(200).json({
      notifications: paginated,
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (err) {
    await Log("backend", "error", "handler", `getAllNotifications failed: ${(err as Error).message}`);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}

export async function getPriorityInbox(req: Request, res: Response): Promise<void> {
  try {
    const n = parseInt((req.query.n as string) || "10");
    const { notification_type } = req.query;

    const params: Record<string, string> = {};
    if (notification_type) params["notification_type"] = notification_type as string;

    const all = await fetchFromAPI(params);

    const heap = new MaxHeap();
    for (const notif of all) {
      heap.insert(notif);
    }

    const topN = heap.getTopN(n);

    await Log("backend", "info", "handler", `Priority inbox — top ${n} extracted from ${all.length} notifications`);

    res.status(200).json({
      notifications: topN,
      count: topN.length,
      total_fetched: all.length,
    });
  } catch (err) {
    await Log("backend", "error", "handler", `getPriorityInbox failed: ${(err as Error).message}`);
    res.status(500).json({ error: "Failed to fetch priority notifications" });
  }
}

export async function getByType(req: Request, res: Response): Promise<void> {
  try {
    const { type } = req.params as { type: string };
    if(type == null || type == undefined) return
    const validTypes: NotificationType[] = ["Placement", "Result", "Event"];

    if (!validTypes.includes(type as NotificationType)) {
      await Log("backend", "warn", "handler", `Invalid type filter: ${type}`);
      res.status(400).json({ error: `type must be one of: ${validTypes.join(", ")}` });
      return;
    }

    const all = await fetchFromAPI({ notification_type: type });

    const heap = new MaxHeap();
    for (const n of all) heap.insert(n);
    const sorted = heap.getTopN(all.length);

    await Log("backend", "info", "handler", `Fetched ${sorted.length} notifications of type ${type}`);

    res.status(200).json({
      notifications: sorted,
      count: sorted.length,
      type,
    });
  } catch (err) {
    await Log("backend", "error", "handler", `getByType failed: ${(err as Error).message}`);
    res.status(500).json({ error: "Failed to fetch notifications by type" });
  }
}