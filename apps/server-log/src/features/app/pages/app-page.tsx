import { useAuth } from "@/features/auth/contexts/auth-context";
import { UserNav } from "../components/user-nav";
import { useWebSocketLogs } from "../hooks/use-websocket-logs";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Wifi, WifiOff, Trash2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQueryState } from "nuqs";
import { Spinner } from "@/components/ui/spinner";

// Lazy load LogViewer untuk code splitting
const LogViewer = lazy(() => import("../components/log-viewer").then((m) => ({ default: m.LogViewer })));

export default function AppPage() {
  const { user } = useAuth();
  const { logs, isConnected, isConnecting, error, clearLogs } = useWebSocketLogs();
  const [mode, setMode] = useQueryState("mode", {
    defaultValue: "pretty" as "pretty" | "inline",
    parse: (value) => (value === "inline" ? "inline" : "pretty"),
    serialize: (value) => value,
  });

  return (
    <div className="h-screen flex flex-col gap-4 p-8 overflow-hidden">
      <div className="flex items-center justify-between gap-2 shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back {user?.username}!</h2>
          <p className="text-muted-foreground">Log server realtime dari backend smartfarming</p>
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </div>

      {error && (
        <Alert
          variant="destructive"
          className="shrink-0"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="shrink-0">
        <CardContent>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                    <Badge
                      variant="outline"
                      className="font-medium text-yellow-500 border-yellow-500/50"
                    >
                      Connecting...
                    </Badge>
                  </>
                ) : isConnected ? (
                  <>
                    <Wifi className="h-4 w-4 text-green-500" />
                    <Badge
                      variant="connected"
                      className="font-medium"
                    >
                      Connected
                    </Badge>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-red-500" />
                    <Badge
                      variant="destructive"
                      className="font-medium"
                    >
                      Disconnected
                    </Badge>
                  </>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {logs.length} log{logs.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1">
                <Button
                  variant={mode === "pretty" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setMode("pretty")}
                  className="h-8"
                >
                  JSON Pretty
                </Button>
                <Button
                  variant={mode === "inline" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setMode("inline")}
                  className="h-8"
                >
                  Default
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={clearLogs}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Suspense
        fallback={
          <Card className="flex-1 flex items-center justify-center min-h-0">
            <CardContent className="pt-6">
              <Spinner />
            </CardContent>
          </Card>
        }
      >
        <LogViewer
          logs={logs}
          mode={mode}
          isConnecting={isConnecting}
        />
      </Suspense>
    </div>
  );
}
