import { useEffect, useRef, useState, useCallback } from "react";
import { getAccessToken } from "@/features/login/utils/token-helper";

export interface LogMessage {
  id: string; // Unique ID untuk setiap log
  timestamp: string;
  level: "INFO" | "WARNING" | "ERROR" | "DEBUG" | "CRITICAL";
  module: string;
  message: string;
  line: number;
}

const MAX_LOGS = 1000; // Maksimal log yang disimpan untuk efisiensi memori

export function useWebSocketLogs() {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const isConnectingRef = useRef(false); // Prevent multiple connections
  const isMountedRef = useRef(false); // Track if component is mounted

  const connect = useCallback(() => {
    // Prevent multiple simultaneous connections
    if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    // Check if component is mounted before connecting
    if (!isMountedRef.current) {
      return;
    }

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);

    const token = getAccessToken();

    if (!token) {
      setError("Token tidak ditemukan");
      setIsConnecting(false);
      isConnectingRef.current = false;
      return;
    }

    try {
      // Close existing connection if any
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      // WebSocket dengan token di query parameter
      const ws = new WebSocket(`wss://smartfarmingapi.teknohole.com/ws/server/logs/?token=${encodeURIComponent(token)}`);

      ws.onopen = () => {
        console.log("WebSocket connected");
        if (isMountedRef.current) {
          setIsConnected(true);
          setIsConnecting(false);
          setError(null);
        }
        isConnectingRef.current = false;
      };

      ws.onmessage = (event) => {
        if (!isMountedRef.current) return;

        try {
          const data = JSON.parse(event.data);

          // Skip pesan koneksi dari server
          if (data.status === "Connected to Log Stream") {
            console.log("Connected to log stream");
            return;
          }

          // Pastikan data adalah LogMessage yang valid
          if (data.timestamp && data.level && data.message) {
            const logMessage: LogMessage = {
              ...data,
              id: `${data.timestamp}-${data.module}-${data.line}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            };

            setLogs((prevLogs) => {
              // Cek duplikasi berdasarkan timestamp, module, line, dan message
              const isDuplicate = prevLogs.some(
                (log) =>
                  log.timestamp === logMessage.timestamp &&
                  log.module === logMessage.module &&
                  log.line === logMessage.line &&
                  log.message === logMessage.message
              );

              if (isDuplicate) {
                console.warn("Duplicate log detected, skipping:", logMessage);
                return prevLogs;
              }

              const newLogs = [...prevLogs, logMessage];
              // Batasi jumlah log untuk efisiensi memori
              if (newLogs.length > MAX_LOGS) {
                return newLogs.slice(-MAX_LOGS);
              }
              return newLogs;
            });
          }
        } catch (err) {
          console.error("Error parsing log message:", err);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        if (isMountedRef.current) {
          setError("Terjadi kesalahan koneksi WebSocket");
          setIsConnecting(false);
        }
        isConnectingRef.current = false;
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        if (isMountedRef.current) {
          setIsConnected(false);
          setIsConnecting(false);
        }
        isConnectingRef.current = false;

        // Auto-reconnect setelah 3 detik jika masih mounted
        if (isMountedRef.current) {
          reconnectTimeoutRef.current = window.setTimeout(() => {
            console.log("Attempting to reconnect...");
            connect();
          }, 3000);
        }
      };

      wsRef.current = ws;
    } catch (err) {
      console.error("Error creating WebSocket:", err);
      if (isMountedRef.current) {
        setError("Gagal membuat koneksi WebSocket");
        setIsConnecting(false);
      }
      isConnectingRef.current = false;
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    isConnectingRef.current = false;

    if (wsRef.current) {
      // Remove event handlers to prevent them from firing during cleanup
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      wsRef.current.close();
      wsRef.current = null;
    }

    if (isMountedRef.current) {
      setIsConnected(false);
      setIsConnecting(false);
    }
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    // Small delay to prevent race condition on hot reload
    const initTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        connect();
      }
    }, 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimeout);
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

  return {
    logs,
    isConnected,
    isConnecting,
    error,
    clearLogs,
    reconnect: connect,
  };
}
