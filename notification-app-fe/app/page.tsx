"use client";
import { useEffect, useState } from "react";

const API = "http://localhost:4000";

type FilterType = "All" | "Placement" | "Result" | "Event" | "Priority";

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const TYPE_COLOR: Record<string, string> = {
  Placement: "#4caf50",
  Result: "#2196f3",
  Event: "#ff9800",
};

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("All");

  useEffect(() => { fetchData(filter); }, [filter]);

  async function fetchData(type: FilterType) {
    setLoading(true);
    try {
      let url = `${API}/notifications?limit=50`;
      if (type === "Priority") url = `${API}/notifications/priority?n=10`;
      else if (type !== "All") url = `${API}/notifications/type/${type}`;

      const res = await fetch(url);
      const data = await res.json();
      setNotifications(data.notifications ?? []);
    } catch {
      setNotifications([]);
    }
    setLoading(false);
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.logo}>🔔 Notification Center</span>
        <span style={styles.badge}>{notifications.length}</span>
      </div>

      <div style={styles.container}>
        {/* Filters */}
        <div style={styles.filters}>
          {(["All", "Priority", "Placement", "Result", "Event"] as FilterType[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                ...styles.filterBtn,
                background: filter === t ? "#7c78e8" : "#1e1e1e",
                color: filter === t ? "#fff" : "#888",
                borderColor: filter === t ? "#7c78e8" : "#2a2a2a",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div style={styles.center}>
            <p style={{ color: "#555" }}>Loading...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div style={styles.center}>
            <p style={{ color: "#555" }}>No notifications found</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {["#", "Type", "Message", "Time"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notifications.map((n, i) => (
                <tr key={n.ID} style={styles.tr}>
                  <td style={{ ...styles.td, color: "#555" }}>{i + 1}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.chip,
                      color: TYPE_COLOR[n.Type] ?? "#aaa",
                      borderColor: TYPE_COLOR[n.Type] ?? "#aaa",
                    }}>
                      {n.Type}
                    </span>
                  </td>
                  <td style={styles.td}>{n.Message}</td>
                  <td style={{ ...styles.td, color: "#555", fontSize: 12 }}>
                    {new Date(n.Timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    color: "#e0e0e0",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    background: "#1a1a1a",
    borderBottom: "1px solid #2a2a2a",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: 600,
    fontSize: 16,
    color: "#e0e0e0",
  },
  badge: {
    background: "#7c78e8",
    color: "#fff",
    borderRadius: 12,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px 16px",
  },
  filters: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    flexWrap: "wrap" as const,
  },
  filterBtn: {
    padding: "6px 16px",
    borderRadius: 6,
    border: "1px solid",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    overflow: "hidden",
  },
  th: {
    textAlign: "left" as const,
    padding: "12px 16px",
    color: "#666",
    fontWeight: 600,
    fontSize: 12,
    borderBottom: "1px solid #2a2a2a",
    textTransform: "uppercase" as const,
  },
  tr: {
    borderBottom: "1px solid #1e1e1e",
  },
  td: {
    padding: "12px 16px",
    color: "#ddd",
    fontSize: 14,
  },
  chip: {
    border: "1px solid",
    borderRadius: 4,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 600,
  },
  center: {
    textAlign: "center" as const,
    marginTop: 60,
  },
};