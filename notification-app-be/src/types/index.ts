
export type NotificationType = "Placement" | "Result" | "Event";
export type LogLevel = "info" | "warn" | "error" | "fatal" | "debug";
export type LogStack = "backend" | "frontend";

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

export interface APIResponse {
  notifications: Notification[];
}