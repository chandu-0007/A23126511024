
export type NotificationType = "Placement" | "Result" | "Event";
export type LogLevel = "info" | "warn" | "error" | "fatal" | "debug";
export type LogStack = "backend" | "frontend";

export interface Notification {
  id: string;
  studentId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Click {
  timestamp: string;
  source: string;
  location: string;
}