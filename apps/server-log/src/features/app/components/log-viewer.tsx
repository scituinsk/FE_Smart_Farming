import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, Loader2 } from "lucide-react";
import type { LogMessage } from "../hooks/use-websocket-logs";
import { cn } from "@/lib/utils";

interface LogViewerProps {
  logs: LogMessage[];
  mode: "pretty" | "inline";
  isConnecting?: boolean;
}

const getLevelColor = (level: LogMessage["level"]) => {
  switch (level) {
    case "INFO":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "WARNING":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "ERROR":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "CRITICAL":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "DEBUG":
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

const formatTimestamp = (timestamp: string) => {
  try {
    // Parse timestamp format: "2025-11-22 18:54:06,548"
    const [datePart, timePart] = timestamp.split(" ");
    const [timeOnly, ms] = timePart.split(",");

    // Buat Date object
    const date = new Date(`${datePart}T${timeOnly}`);

    // Format dengan locale client
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}.${ms}`;
  } catch {
    // Jika parsing gagal, return timestamp original
    return timestamp;
  }
};

export function LogViewer({ logs, mode, isConnecting = false }: LogViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Reverse logs agar yang terbaru di atas
  const sortedLogs = [...logs].reverse();

  const copyToClipboard = async (text: string, logId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(logId);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Auto-scroll ke atas ketika ada log baru (karena log baru di atas)
  useEffect(() => {
    if (shouldAutoScrollRef.current && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [logs]);

  // Deteksi jika user scroll manual
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop } = containerRef.current;
    const isAtTop = scrollTop < 10;

    shouldAutoScrollRef.current = isAtTop;
  };

  if (logs.length === 0) {
    return (
      <Card className="flex-1 flex items-center justify-center min-h-0">
        <CardContent className="pt-6">
          {isConnecting ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm">Menghubungkan ke server...</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Menunggu log dari server...</p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 flex flex-col overflow-hidden min-h-0">
      <CardContent className="p-0 flex-1 overflow-hidden">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto overflow-x-hidden p-4 space-y-2 font-mono text-xs"
        >
          {sortedLogs.map((log) => (
            <div
              key={log.id}
              className={cn("transition-colors hover:bg-muted/50", mode === "inline" ? "" : "p-3 rounded-md border space-y-2")}
            >
              {mode === "pretty" ? (
                // Mode JSON Pretty
                <>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <Badge
                      variant="outline"
                      className={cn("font-medium", getLevelColor(log.level))}
                    >
                      {log.level}
                    </Badge>
                    <span className="text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{log.module}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Line {log.line}</span>
                  </div>
                  <div className="relative group">
                    <pre className="bg-muted/50 text-foreground whitespace-pre-wrap wrap-break-word overflow-x-auto text-xs leading-relaxed p-3 rounded-md border">
                      {`{
  "timestamp": "${log.timestamp}",
  "level": "${log.level}",
  "module": "${log.module}",
  "line": ${log.line},
  "message": "${log.message}"
}`}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `{
  "timestamp": "${log.timestamp}",
  "level": "${log.level}",
  "module": "${log.module}",
  "line": ${log.line},
  "message": "${log.message}"
}`,
                          log.id
                        )
                      }
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-background border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                      title="Copy JSON"
                    >
                      {copiedIndex === log.id ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </>
              ) : (
                // Mode Default/Inline
                <div className="text-foreground">
                  {formatTimestamp(log.timestamp)} [{log.level}] {log.module}
                  {">"} {log.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
